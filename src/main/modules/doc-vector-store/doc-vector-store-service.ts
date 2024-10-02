import { OllamaEmbeddings } from '@langchain/ollama';
import { Document } from '@langchain/core/documents';
import * as fs from 'fs';
import { convert } from 'html-to-text';
import llama3Tokenizer from 'llama3-tokenizer-js';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { logToRenderer } from '@/libs/utils';
import { WebsiteScrapedContent } from '@/renderer/hooks/use-search';
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { windowService } from '../window/window.service';

export class DocVectorStoreService {
  private static instance: DocVectorStoreService;
  public static mainWindow: BrowserWindow | null = null;
  private vectorStore: HNSWLib | null = null;
  private llmEmbeddings: OllamaEmbeddings | null = null;
  private inMemoryVectorStore: MemoryVectorStore | null = null;
  private vectorStorePath: string = path.join(
    app.getPath('userData'),
    'hnswlib.index',
  );

  private constructor() {}

  public static getInstance(): DocVectorStoreService {
    if (!DocVectorStoreService.instance) {
      DocVectorStoreService.instance = new DocVectorStoreService();
    }
    return DocVectorStoreService.instance;
  }

  public async init() {
    this.llmEmbeddings = new OllamaEmbeddings({
      model: 'mxbai-embed-large:latest',
      baseUrl: 'http://localhost:11434',
    });

    console.log('Mia: DocVectorStoreService init() ');
    try {
      console.log('DOES ', this.vectorStorePath, ' exist ?');
      console.log(fs.existsSync(this.vectorStorePath));
      if (fs.existsSync(this.vectorStorePath)) {
        console.log(
          'Loading existing vector store from path : ' + this.vectorStorePath,
        );
        this.vectorStore = await HNSWLib.load(
          app.getPath('userData'),
          this.llmEmbeddings!,
        );
        console.log('Existing vector store loaded successfully');
      } else {
        console.log('No existing vector store found, creating new one');
        this.vectorStore = new HNSWLib(this.llmEmbeddings!, {
          space: 'cosine',
        });

        console.log('CREATED A new HNSWLib');
        // Optionally add an initial document

        await this.vectorStore.addDocuments([
          new Document({
            pageContent: 'Initial document',
            metadata: { source: 'initialization' },
          }),
        ]);
        console.log('initial document added');

        // await this.vectorStore.save(this.vectorStorePath);
        console.log('New vector intialized and saved');
      }
    } catch (error) {
      console.error('Error initializing vector store:', error);
      throw new Error('Failed to initialize vector store');
    }
  }

  public async addDocInMemory(htmlFiles: WebsiteScrapedContent[]) {
    if (!this.inMemoryVectorStore) {
      this.inMemoryVectorStore = new MemoryVectorStore(this.llmEmbeddings!);
    }
    const documentsChunks = await this.chunkifyDocs(htmlFiles);
    this.inMemoryVectorStore?.addDocuments(documentsChunks);
  }

  public async searchDocsInMemory(query: string, qty: number) {
    const result = await this.inMemoryVectorStore?.similaritySearch(query, qty);
    return result;
  }

  public async deleteAllDocsInMemory() {
    this.inMemoryVectorStore = null;
  }

  public async addDocs(htmlFiles: WebsiteScrapedContent[]) {
    logToRenderer(windowService.getMainWindow(), 'Adding docs to vector store');
    console.log('Adding docs to vector store');
    if (htmlFiles.length === 0) {
      logToRenderer(windowService.getMainWindow(), 'No HTML files to add');
      return;
    }
    const documentsChunks = await this.chunkifyDocs(htmlFiles);

    await this.vectorStore?.addDocuments(documentsChunks);

    logToRenderer(windowService.getMainWindow(), 'Saving vector store');
    console.log('Saving vector store');
    // await this.vectorStore?.save(this.vectorStorePath);
    logToRenderer(windowService.getMainWindow(), 'Vector store saved');
    console.log(
      'vector store ',
      this.vectorStore?.save(app.getPath('userData')),
    );
    console.log(
      'These are the news keys ',
      this.vectorStore?.docstore._docs.keys(),
    );
    console.log('Save Done');
  }

  public async searchDocs(query: string, qty: number) {
    logToRenderer(windowService.getMainWindow(), 'Searching docs');
    console.log(
      'these are the current keys',
      this.vectorStore?.docstore._docs.keys(),
    );
    try {
      const response = await this.vectorStore?.similaritySearch(query, qty);
      // const response = await retriever?.invoke(query);
      logToRenderer(windowService.getMainWindow(), 'Search completed');
      return response;
    } catch (error) {
      console.error('Error searching docs:', error);
      throw new Error('Failed to search docs');
    }
  }

  public async getDoc(
    recordId: string,
  ): Promise<{ recordId: string; document: Document } | null> {
    logToRenderer(windowService.getMainWindow(), `getDoc (${recordId})`);
    const entries = this.vectorStore!.docstore._docs.entries();

    const doc = Array.from(entries).find((doc) => doc[0] === recordId);
    if (!doc) {
      logToRenderer(windowService.getMainWindow(), 'Document not found');
      return null;
    }
    logToRenderer(windowService.getMainWindow(), 'Document found');
    return { recordId: doc[0], document: doc[1] };
  }

  public async getDocsByMetadata(
    metaDataKey: string,
    metaDataValue: string,
    partial = false,
  ): Promise<{ recordId: string; document: Document }[]> {
    logToRenderer(
      windowService.getMainWindow(),
      'Getting documents by metadata',
    );
    const entries = this.vectorStore?.docstore._docs.entries();
    logToRenderer(windowService.getMainWindow(), `entries : ${entries}`);
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
          windowService.getMainWindow(),
          `Matching documents found ${matchingDocs.length}`,
        );
        return matchingDocs;
      } else {
        logToRenderer(
          windowService.getMainWindow(),
          'No matching documents found',
        );
        return [];
      }
    }
    logToRenderer(
      windowService.getMainWindow(),
      'No entries found in vector store',
    );
    return [];
  }

  public async deleteDoc(recordId: string) {
    logToRenderer(
      windowService.getMainWindow(),
      `In function deleteDoc (${recordId})`,
    );
    const doc = await this.getDoc(recordId);

    if (!doc) {
      logToRenderer(
        windowService.getMainWindow(),
        'Document not found for deletion',
      );
      return;
    }
    this.vectorStore!.docstore._docs.delete(doc.recordId);
    await this.vectorStore!.save(this.vectorStorePath);

    logToRenderer(
      windowService.getMainWindow(),
      'Document deleted and vector store saved',
    );
    return recordId;
  }

  public async deleteAllDocs() {
    logToRenderer(windowService.getMainWindow(), 'Deleting all documents');
    await this.vectorStore!.delete({ directory: this.vectorStorePath });
    // await this.vectorStore?.save(this.vectorStorePath);
  }

  chunkifyDocs = async (
    htmlFiles: WebsiteScrapedContent[],
  ): Promise<Document[]> => {
    logToRenderer(windowService.getMainWindow(), 'Chunkifying documents');
    console.log('Chunkify docs');
    // Create Documents for each HTML file and split them
    const documents: Document[] = [];
    for (const file of htmlFiles) {
      const chunks = this.splitHtmlToChunks(file);
      documents.push(...chunks);
    }
    console.log('Chunkify docs done');
    logToRenderer(windowService.getMainWindow(), 'Documents chunkified');
    return documents;
  };

  splitHtmlToChunks = (
    file: WebsiteScrapedContent,
    maxTokens: number = 300,
  ): Document[] => {
    logToRenderer(windowService.getMainWindow(), 'Splitting HTML into chunks');
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
    logToRenderer(windowService.getMainWindow(), 'HTML split into chunks');
    return chunks;
  };
}

// Update the export to be async
export const docVectorStoreService = DocVectorStoreService.getInstance();
