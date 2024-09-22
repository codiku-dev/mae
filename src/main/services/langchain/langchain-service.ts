import { ChatOllama, OllamaEmbeddings } from '@langchain/ollama';
import { Document } from '@langchain/core/documents';
import * as fs from 'fs';
import { convert } from 'html-to-text';
import llama3Tokenizer from 'llama3-tokenizer-js';
import path from 'path';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { getResourcesPath } from '@/libs/utils';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { WebsiteScrapedContent } from '@/renderer/hooks/use-app-store';

export class LangchainService {
  private static instance: LangchainService;
  private vectorStore: HNSWLib | null = null;
  private llmEmbeddings: OllamaEmbeddings | null = null;
  private vectorStorePath: string = getResourcesPath(
    '/assets/vectorStore.index',
  );

  private constructor() {
    this.init();
  }

  public static getInstance(): LangchainService {
    if (!LangchainService.instance) {
      LangchainService.instance = new LangchainService();
    }
    return LangchainService.instance;
  }

  public async init() {
    console.log('Init vector store at ', this.vectorStorePath);
    this.llmEmbeddings = new OllamaEmbeddings({
      model: 'mxbai-embed-large',
      baseUrl: 'http://localhost:11434',
    });

    if (fs.existsSync(this.vectorStorePath + '')) {
      console.log('Loading existing vector store...');
      this.vectorStore = await HNSWLib.load(
        this.vectorStorePath,
        this.llmEmbeddings,
      );
    } else {
      console.log('Creating new vector store...');
      this.vectorStore = new HNSWLib(this.llmEmbeddings, { space: 'cosine' });
    }
  }

  public async addDocs(htmlFiles: WebsiteScrapedContent[]) {
    console.log('Adding docs to vector store');
    if (htmlFiles.length === 0) {
      return;
    }
    const documentsChunks = await this.chunkifyDocs(htmlFiles);
    console.log('documentsChunks', documentsChunks);
    console.log('Adding doc to vector store ');
    await this.vectorStore?.addDocuments(documentsChunks);
    console.log('Saving vector store');
    await this.vectorStore?.save(this.vectorStorePath);
    console.log('Save Done');
  }

  public async searchDocs(query: string, qty: number) {
    console.log('Searching docs');
    const retriever = this.vectorStore?.asRetriever(qty);
    const searchResults = await retriever?.invoke(query);
    console.log('Search results found : ', searchResults?.length);
    return searchResults;
  }

  public async getDoc(id: string) {
    const entries = this.vectorStore!.docstore._docs.entries();
    const doc = Array.from(entries).find((doc) => doc[1].id === id);
    if (!doc) {
      return null;
    }
    return { recordId: doc[0], document: doc[1] };
  }

  public async deleteDoc(documentId: string) {
    const doc = await this.getDoc(documentId);
    if (!doc) {
      return;
    }
    this.vectorStore!.docstore._docs.delete(doc.recordId);
    await this.vectorStore!.save(this.vectorStorePath);
  }

  chunkifyDocs = async (
    htmlFiles: WebsiteScrapedContent[],
  ): Promise<Document[]> => {
    console.log('Chunkify docs');
    // Create Documents for each HTML file and split them
    const documents: Document[] = [];
    for (const file of htmlFiles) {
      const chunks = this.splitHtmlToChunks(file);
      // chunks.forEach((chunk, index) => {
      //   chunk.metadata = {
      //     ...chunk.metadata,
      //     url: file.url,
      //     sizeKb: file.sizeKb,
      //   };

      // });
      documents.push(...chunks);
    }

    return documents;
  };

  getAllHTMLFilesContent = async (
    folderPath: string,
  ): Promise<Array<{ url: string; content: string }>> => {
    const htmlFilesName = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith('.html'));
    console.log('htmlFiles', htmlFilesName);
    const filesData: Array<{ url: string; content: string }> = [];
    for (const url of htmlFilesName) {
      const filePath = path.join(folderPath, url);
      const content = await fs.promises.readFile(filePath, 'utf-8');
      filesData.push({ url, content });
    }

    return filesData;
  };

  requestLLM = async (
    question: string,
    documents: Document[],
    onChunk?: (chunk?: string) => void,
    onError?: (error: Error) => void,
    printInConsole = true,
  ): Promise<string> => {
    try {
      const llm = new ChatOllama({
        model: 'llama3.1:latest', // or any other model you prefer
        baseUrl: 'http://localhost:11434', // adjust if your Ollama instance is running elsewhere
      });
      // const previousMessages: any[] = messages.map((message) => [
      //   message.role,
      //   message.content,
      // ]);
      const prompt = ChatPromptTemplate.fromTemplate(`
      Answer the question based on the provided website documentation (html format). If asked for code:
      1. Always include necessary imports in your answer.
      2. Provide complete, runnable code snippets when possible.
      3. Make sure the correct programming language is specified at the beginning of each code block.
      Be concise in your explanations. Don't comment on your answer.
      Context: {context}
      Question: {question}`);
      // const prompt = ChatPromptTemplate.fromMessages([
      //   ...previousMessages,
      //   message,
      // ]);
      const chain = await createStuffDocumentsChain({ llm, prompt });
      const stream = await chain.stream({ question, context: documents });
      let response = '';
      for await (const chunk of stream) {
        response += chunk;
        if (printInConsole) {
          process.stdout.write(chunk);
        }
        onChunk?.(chunk);
      }
      onChunk?.(undefined);
      if (printInConsole) {
        process.stdout.write('\n');
      }
      return response;
    } catch (error) {
      onError?.(error as Error);
      return '';
    }
  };

  splitHtmlToChunks = (
    file: WebsiteScrapedContent,
    maxTokens: number = 300,
  ): Document[] => {
    console.log('Split html to chunks');
    const chunks: Document[] = [];
    let currentChunk = '';
    let currentTokens = 0;

    // Regex to match <code> blocks
    const codeBlockRegex = /<code[\s\S]*?<\/code>/gi;
    const codeBlocks: string[] = [];

    // Replace <code> blocks with placeholders and store them
    file.htmlContent = file.htmlContent.replace(codeBlockRegex, (match) => {
      const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
      codeBlocks.push(match);
      return placeholder;
    });

    // Convert remaining HTML to text
    const text = convert(file.htmlContent, {
      wordwrap: false,
      preserveNewlines: true,
    });

    // Split into lines and process
    const lines = text.split('\n');
    let chunkIndex = 0;
    for (const line of lines) {
      const processedLine = line.replace(
        /__CODE_BLOCK_(\d+)__/g,
        (_, index) => codeBlocks[parseInt(index)],
      );
      const lineTokens = llama3Tokenizer.encode(processedLine);

      if (currentTokens + lineTokens.length > maxTokens) {
        if (currentChunk) {
          chunks.push(
            new Document({
              pageContent: currentChunk.trim(),
              metadata: {
                url: `${file.url}`,
                sizeKb: file.sizeKb,
                chunkIndex: chunkIndex,
              },
              id: `${file.url}_chk_${chunkIndex}`,
            }),
          );
          chunkIndex++;
        }
        currentChunk = processedLine + '\n';
        currentTokens = lineTokens.length;
      } else {
        currentChunk += processedLine + '\n';
        currentTokens += lineTokens.length;
      }
    }

    if (currentChunk) {
      chunks.push(
        new Document({
          pageContent: currentChunk.trim(),
          metadata: {
            url: `${file.url}`,
            sizeKb: file.sizeKb,
            chunkIndex: chunkIndex,
          },
          id: `${file.url}_chk_${chunkIndex}`,
        }),
      );
    }
    return chunks;
  };
}

export const langchainService = LangchainService.getInstance();

export async function langchainDemo() {
  // const htmlFiles = await langchainService.getAllHTMLFilesContent(
  //   getResourcesPath('src/main/services/langchain/docs'),
  // );
  // await langchainService.addDocs(htmlFiles);
  // const searchResults = await langchainService.searchDocs(
  //   'How to add an avatar to a button?',
  //   1,
  // );
}
