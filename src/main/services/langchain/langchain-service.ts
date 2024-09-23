import { OllamaEmbeddings } from '@langchain/ollama';
import { Document } from '@langchain/core/documents';
import * as fs from 'fs';
import { convert } from 'html-to-text';
import llama3Tokenizer from 'llama3-tokenizer-js';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { getResourcesPath, logToRenderer } from '@/libs/utils';
import { WebsiteScrapedContent } from '@/renderer/hooks/use-app-store';
import { app, BrowserWindow } from 'electron';
import path from 'path';

export class LangchainService {
  private static instance: LangchainService;
  public static mainWindow: BrowserWindow | null = null;
  private vectorStore: HNSWLib | null = null;
  private llmEmbeddings: OllamaEmbeddings | null = null;
  private vectorStorePath: string = path.join(
    app.getPath('userData'),
    'mia-documents-learning-vector-store.index',
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
    logToRenderer(LangchainService.mainWindow, 'Initializing LangchainService');
    console.log('Init vector store at ', this.vectorStorePath);
    this.llmEmbeddings = new OllamaEmbeddings({
      model: 'mxbai-embed-large',
      baseUrl: 'http://localhost:11434',
    });
    if (!this.vectorStore) {
      logToRenderer(
        LangchainService.mainWindow,
        'Vector store not initialized',
      );
      if (fs.existsSync(this.vectorStorePath + '')) {
        logToRenderer(
          LangchainService.mainWindow,
          'Loading existing vector store',
        );
        console.log('Loading existing vector store...');
        this.vectorStore = await HNSWLib.load(
          this.vectorStorePath,
          this.llmEmbeddings,
        );
      } else {
        logToRenderer(LangchainService.mainWindow, 'Creating new vector store');
        console.log('Creating new vector store...');
        this.vectorStore = new HNSWLib(this.llmEmbeddings, { space: 'cosine' });
      }
    }
  }

  public async addDocs(htmlFiles: WebsiteScrapedContent[]) {
    logToRenderer(LangchainService.mainWindow, 'Adding docs to vector store');
    console.log('Adding docs to vector store');
    if (htmlFiles.length === 0) {
      logToRenderer(LangchainService.mainWindow, 'No HTML files to add');
      return;
    }
    const documentsChunks = await this.chunkifyDocs(htmlFiles);

    await this.vectorStore?.addDocuments(documentsChunks);

    logToRenderer(LangchainService.mainWindow, 'Saving vector store');
    console.log('Saving vector store');
    await this.vectorStore?.save(this.vectorStorePath);
    logToRenderer(LangchainService.mainWindow, 'Vector store saved');
    console.log('Save Done');
  }

  public async searchDocs(query: string, qty: number) {
    logToRenderer(LangchainService.mainWindow, 'Searching docs');
    console.log('Searching docs');
    const retriever = this.vectorStore?.asRetriever(qty);
    const response = await retriever?.invoke(query);
    logToRenderer(LangchainService.mainWindow, 'Search completed');
    console.log('the response', response);
    return response;
  }

  public async getDoc(
    id: string,
  ): Promise<{ recordId: string; document: Document } | null> {
    logToRenderer(LangchainService.mainWindow, 'Getting document by ID');
    const entries = this.vectorStore!.docstore._docs.entries();
    const doc = Array.from(entries).find((doc) => doc[1].id === id);
    if (!doc) {
      logToRenderer(LangchainService.mainWindow, 'Document not found');
      return null;
    }
    logToRenderer(LangchainService.mainWindow, 'Document found');
    return { recordId: doc[0], document: doc[1] };
  }

  public async getDocsByMetadata(
    metadata: Record<string, string>,
    partial = false,
  ): Promise<{ recordId: string; document: Document }[]> {
    logToRenderer(LangchainService.mainWindow, 'Getting documents by metadata');
    const entries = this.vectorStore?.docstore._docs.entries();
    const matchingDocs: { recordId: string; document: Document }[] = [];
    if (entries) {
      for (const [recordId, document] of entries) {
        const isMatch = Object.entries(metadata).every(
          ([key, value]) =>
            document.metadata[key] === value ||
            (partial && document.metadata[key]?.includes(value)),
        );

        if (isMatch) {
          matchingDocs.push({ recordId, document });
        }
      }

      if (matchingDocs.length > 0) {
        logToRenderer(LangchainService.mainWindow, 'Matching documents found');
        return matchingDocs;
      } else {
        logToRenderer(
          LangchainService.mainWindow,
          'No matching documents found',
        );
        return [];
      }
    }
    logToRenderer(
      LangchainService.mainWindow,
      'No entries found in vector store',
    );
    return [];
  }

  public async deleteDoc(documentId: string) {
    logToRenderer(LangchainService.mainWindow, 'Deleting document');
    const doc = await this.getDoc(documentId);
    if (!doc) {
      logToRenderer(
        LangchainService.mainWindow,
        'Document not found for deletion',
      );
      return;
    }
    this.vectorStore!.docstore._docs.delete(doc.recordId);
    await this.vectorStore!.save(this.vectorStorePath);
    logToRenderer(
      LangchainService.mainWindow,
      'Document deleted and vector store saved',
    );
    return documentId;
  }

  public async deleteAllDocs() {
    logToRenderer(LangchainService.mainWindow, 'Deleting all documents');
    this.vectorStore!.docstore._docs.clear();
    await this.vectorStore!.save(this.vectorStorePath);
    logToRenderer(
      LangchainService.mainWindow,
      'All documents deleted and vector store saved',
    );
  }

  chunkifyDocs = async (
    htmlFiles: WebsiteScrapedContent[],
  ): Promise<Document[]> => {
    logToRenderer(LangchainService.mainWindow, 'Chunkifying documents');
    console.log('Chunkify docs');
    // Create Documents for each HTML file and split them
    const documents: Document[] = [];
    for (const file of htmlFiles) {
      const chunks = this.splitHtmlToChunks(file);
      documents.push(...chunks);
    }

    logToRenderer(LangchainService.mainWindow, 'Documents chunkified');
    return documents;
  };

  splitHtmlToChunks = (
    file: WebsiteScrapedContent,
    maxTokens: number = 300,
  ): Document[] => {
    logToRenderer(LangchainService.mainWindow, 'Splitting HTML into chunks');
    const chunks: Document[] = [];
    let currentChunk = '';
    let currentTokens = 0;

    // Regex to match <code> blocks
    const codeBlockRegex = /<code[\s\S]*?<\/code>/gi;
    const codeBlocks: string[] = [];

    const splitCodeBlock = (codeBlock: string, maxTokens: number): string[] => {
      const lines = codeBlock.split('\n');
      const chunks: string[] = [];
      let currentChunk = '';
      let currentTokens = 0;

      for (const line of lines) {
        const lineTokens = llama3Tokenizer.encode(line);
        if (currentTokens + lineTokens.length > maxTokens && currentChunk) {
          chunks.push(currentChunk);
          currentChunk = '';
          currentTokens = 0;
        }
        currentChunk += line + '\n';
        currentTokens += lineTokens.length;
      }

      if (currentChunk) {
        chunks.push(currentChunk);
      }

      return chunks;
    };

    // Replace <code> blocks with placeholders and store them
    file.htmlContent = file.htmlContent.replace(codeBlockRegex, (match) => {
      const codeChunks = splitCodeBlock(match, maxTokens);
      const placeholders = codeChunks.map((_, index) => {
        const placeholder = `__CODE_BLOCK_${codeBlocks.length + index}__`;
        codeBlocks.push(_);
        return placeholder;
      });
      return placeholders.join('\n');
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
          const text = currentChunk.trim();
          chunks.push(
            new Document({
              pageContent: text,
              metadata: {
                url: `${file.url}`,
                sizeKb: text.length / 1024,
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
      const text = currentChunk.trim();
      chunks.push(
        new Document({
          pageContent: text,
          metadata: {
            url: `${file.url}`,
            sizeKb: text.length / 1024,
            chunkIndex: chunkIndex,
          },
          id: `${file.url}_chk_${chunkIndex}`,
        }),
      );
    }
    logToRenderer(LangchainService.mainWindow, 'HTML split into chunks');
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

// getAllHTMLFilesContent = async (
//   folderPath: string,
// ): Promise<Array<{ url: string; content: string }>> => {
//   const htmlFilesName = fs
//     .readdirSync(folderPath)
//     .filter((file) => file.endsWith('.html'));
//   console.log('htmlFiles', htmlFilesName);
//   const filesData: Array<{ url: string; content: string }> = [];
//   for (const url of htmlFilesName) {
//     const filePath = path.join(folderPath, url);
//     const content = await fs.promises.readFile(filePath, 'utf-8');
//     filesData.push({ url, content });
//   }

//   return filesData;
// };
