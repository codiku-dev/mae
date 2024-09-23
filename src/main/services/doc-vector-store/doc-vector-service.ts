import { OllamaEmbeddings } from '@langchain/ollama';
import { Document } from '@langchain/core/documents';
import * as fs from 'fs';
import { convert } from 'html-to-text';
import llama3Tokenizer from 'llama3-tokenizer-js';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { logToRenderer } from '@/libs/utils';
import { WebsiteScrapedContent } from '@/renderer/hooks/use-app-store';
import { app, BrowserWindow } from 'electron';
import path from 'path';

export class DocVectorStoreService {
  private static instance: DocVectorStoreService;
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

  public static getInstance(): DocVectorStoreService {
    if (!DocVectorStoreService.instance) {
      DocVectorStoreService.instance = new DocVectorStoreService();
    }
    return DocVectorStoreService.instance;
  }

  public async init() {
    logToRenderer(
      DocVectorStoreService.mainWindow,
      'Initializing DocVectorStoreService',
    );
    console.log('Init vector store at ', this.vectorStorePath);
    this.llmEmbeddings = new OllamaEmbeddings({
      model: 'mxbai-embed-large',
      baseUrl: 'http://localhost:11434',
    });
    if (!this.vectorStore) {
      logToRenderer(
        DocVectorStoreService.mainWindow,
        'Vector store not initialized',
      );
      if (fs.existsSync(this.vectorStorePath + '')) {
        logToRenderer(
          DocVectorStoreService.mainWindow,
          'Loading existing vector store',
        );
        console.log('Loading existing vector store...');
        this.vectorStore = await HNSWLib.load(
          this.vectorStorePath,
          this.llmEmbeddings,
        );
      } else {
        logToRenderer(
          DocVectorStoreService.mainWindow,
          'Creating new vector store',
        );
        console.log('Creating new vector store...');
        this.vectorStore = new HNSWLib(this.llmEmbeddings, { space: 'cosine' });
      }
    }
  }

  public async addDocs(htmlFiles: WebsiteScrapedContent[]) {
    logToRenderer(
      DocVectorStoreService.mainWindow,
      'Adding docs to vector store',
    );
    console.log('Adding docs to vector store');
    if (htmlFiles.length === 0) {
      logToRenderer(DocVectorStoreService.mainWindow, 'No HTML files to add');
      return;
    }
    const documentsChunks = await this.chunkifyDocs(htmlFiles);

    await this.vectorStore?.addDocuments(documentsChunks);

    logToRenderer(DocVectorStoreService.mainWindow, 'Saving vector store');
    console.log('Saving vector store');
    await this.vectorStore?.save(this.vectorStorePath);
    logToRenderer(DocVectorStoreService.mainWindow, 'Vector store saved');
    console.log('Save Done');
  }

  public async searchDocs(query: string, qty: number) {
    logToRenderer(DocVectorStoreService.mainWindow, 'Searching docs');
    console.log('Searching docs');
    const retriever = this.vectorStore?.asRetriever(qty);
    const response = await retriever?.invoke(query);
    logToRenderer(DocVectorStoreService.mainWindow, 'Search completed');
    console.log('the response', response);
    return response;
  }

  public async getDoc(
    recordId: string,
  ): Promise<{ recordId: string; document: Document } | null> {
    logToRenderer(DocVectorStoreService.mainWindow, `getDoc (${recordId})`);
    const entries = this.vectorStore!.docstore._docs.entries();

    const doc = Array.from(entries).find((doc) => doc[0] === recordId);
    if (!doc) {
      logToRenderer(DocVectorStoreService.mainWindow, 'Document not found');
      return null;
    }
    logToRenderer(DocVectorStoreService.mainWindow, 'Document found');
    return { recordId: doc[0], document: doc[1] };
  }

  public async getDocsByMetadata(
    metaDataKey: string,
    metaDataValue: string,
    partial = false,
  ): Promise<{ recordId: string; document: Document }[]> {
    logToRenderer(
      DocVectorStoreService.mainWindow,
      'Getting documents by metadata',
    );
    const entries = this.vectorStore?.docstore._docs.entries();
    logToRenderer(DocVectorStoreService.mainWindow, `entries : ${entries}`);
    const matchingDocs: { recordId: string; document: Document }[] = [];
    if (entries) {
      for (const [recordId, document] of entries) {
        if (partial === false) {
          if (document.metadata[metaDataKey] === metaDataValue) {
            matchingDocs.push({ recordId, document });
          }
        } else {
          if (document.metadata[metaDataKey]?.includes(metaDataValue)) {
            matchingDocs.push({ recordId, document });
          }
        }
      }

      if (matchingDocs.length > 0) {
        logToRenderer(
          DocVectorStoreService.mainWindow,
          `Matching documents found ${matchingDocs.length}`,
        );
        return matchingDocs;
      } else {
        logToRenderer(
          DocVectorStoreService.mainWindow,
          'No matching documents found',
        );
        return [];
      }
    }
    logToRenderer(
      DocVectorStoreService.mainWindow,
      'No entries found in vector store',
    );
    return [];
  }

  public async deleteDoc(recordId: string) {
    logToRenderer(
      DocVectorStoreService.mainWindow,
      `In function deleteDoc (${recordId})`,
    );
    const doc = await this.getDoc(recordId);

    if (!doc) {
      logToRenderer(
        DocVectorStoreService.mainWindow,
        'Document not found for deletion',
      );
      return;
    }
    this.vectorStore!.docstore._docs.delete(doc.recordId);
    await this.vectorStore!.save(this.vectorStorePath);
    logToRenderer(
      DocVectorStoreService.mainWindow,
      'Document deleted and vector store saved',
    );
    return recordId;
  }

  public async deleteAllDocs() {
    logToRenderer(DocVectorStoreService.mainWindow, 'Deleting all documents');
    this.vectorStore!.docstore._docs.clear();
    await this.vectorStore!.save(this.vectorStorePath);
    logToRenderer(
      DocVectorStoreService.mainWindow,
      'All documents deleted and vector store saved',
    );
  }

  chunkifyDocs = async (
    htmlFiles: WebsiteScrapedContent[],
  ): Promise<Document[]> => {
    logToRenderer(DocVectorStoreService.mainWindow, 'Chunkifying documents');
    console.log('Chunkify docs');
    // Create Documents for each HTML file and split them
    const documents: Document[] = [];
    for (const file of htmlFiles) {
      const chunks = this.splitHtmlToChunks(file);
      documents.push(...chunks);
    }

    logToRenderer(DocVectorStoreService.mainWindow, 'Documents chunkified');
    return documents;
  };

  splitHtmlToChunks = (
    file: WebsiteScrapedContent,
    maxTokens: number = 300,
  ): Document[] => {
    logToRenderer(
      DocVectorStoreService.mainWindow,
      'Splitting HTML into chunks',
    );
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
    logToRenderer(DocVectorStoreService.mainWindow, 'HTML split into chunks');
    return chunks;
  };
}

export const docVectorStoreService = DocVectorStoreService.getInstance();

export async function demo() {
  // const htmlFiles = await DocVectorStoreService.getAllHTMLFilesContent(
  //   getResourcesPath('src/main/services/langchain/docs'),
  // );
  // await DocVectorStoreService.addDocs(htmlFiles);
  // const searchResults = await DocVectorStoreService.searchDocs(
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
