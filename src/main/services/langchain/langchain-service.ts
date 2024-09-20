import { ChatOllama, OllamaEmbeddings } from '@langchain/ollama';
import { Document } from '@langchain/core/documents';
import * as fs from 'fs';
import * as path from 'path';
import { dirname, join } from 'path';
import { encode } from 'gpt-3-encoder';
import { convert } from 'html-to-text';

import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';

import { ChatPromptTemplate } from '@langchain/core/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

import { app } from 'electron';

let vectorstore: HNSWLib;

export async function start() {
  const query = 'Code for accordion';
  console.time('loadVectorStoreWithDocs');
  await loadVectorStoreWithDocs();
  console.timeEnd('loadVectorStoreWithDocs');
  console.time('retrieveRelevantDocs');
  const relevantDocs = await retrieveRelevantDocs(query);
  console.timeEnd('retrieveRelevantDocs');
  console.time('requestLLM');
  const response = await requestLLM(query, relevantDocs);
  console.timeEnd('requestLLM');
  console.log('RESPONSE', response);
}

function splitHtmlToChunks(
  content: string,
  maxTokens: number = 500,
): Document[] {
  const chunks: Document[] = [];
  let currentChunk = '';
  let currentTokens = 0;

  // Regex to match <code> blocks
  const codeBlockRegex = /<code[\s\S]*?<\/code>/gi;
  const codeBlocks: string[] = [];

  // Replace <code> blocks with placeholders and store them
  content = content.replace(codeBlockRegex, (match) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(match);
    return placeholder;
  });

  // Convert remaining HTML to text
  const text = convert(content, { wordwrap: false, preserveNewlines: true });

  // Split into lines and process
  const lines = text.split('\n');
  for (const line of lines) {
    const processedLine = line.replace(
      /__CODE_BLOCK_(\d+)__/g,
      (_, index) => codeBlocks[parseInt(index)],
    );
    const lineTokens = encode(processedLine);

    if (currentTokens + lineTokens.length > maxTokens && currentChunk) {
      chunks.push(new Document({ pageContent: currentChunk.trim() }));
      currentChunk = '';
      currentTokens = 0;
    }
    currentChunk += processedLine + '\n';
    currentTokens += lineTokens.length;
  }

  if (currentChunk) {
    chunks.push(new Document({ pageContent: currentChunk.trim() }));
  }

  return chunks;
}

const loadVectorStoreWithDocs = async () => {
  const llmEmbeddings = new OllamaEmbeddings({
    model: 'mxbai-embed-large',
    baseUrl: 'http://localhost:11434',
  });

  const docsDir = await getFolderPath('docs');
  const vectorStorePath = await getFolderPath('vector_store');

  // Check if the vector store already exists
  if (fs.existsSync(path.join(vectorStorePath, 'hnswlib.index'))) {
    console.log('Loading existing vector store...');
    vectorstore = await HNSWLib.load(vectorStorePath, llmEmbeddings);
  } else {
    console.log('Creating new vector store...');
    const htmlFiles = await getAllHTMLFilesContent(docsDir);
    const documentsChunks = await chunkifyDocs(htmlFiles);

    vectorstore = await HNSWLib.fromDocuments(documentsChunks, llmEmbeddings);
    await vectorstore.save(vectorStorePath);
  }
};

const retrieveRelevantDocs = async (query: string) => {
  const retriever = vectorstore.asRetriever(1);
  const searchResults = await retriever.invoke(query);
  return searchResults;
};

const chunkifyDocs = async (
  htmlFiles: Array<{ fileName: string; content: string }>,
): Promise<Document[]> => {
  // Create Documents for each HTML file and split them
  const documents: Document[] = [];
  for (const file of htmlFiles) {
    const chunks = splitHtmlToChunks(file.content);
    chunks.forEach((chunk, index) => {
      chunk.metadata = { ...chunk.metadata, source: file.fileName };
      chunk.id = file.fileName + '_chk_' + index;
    });
    documents.push(...chunks);
  }
  return documents;
};

async function getAllHTMLFilesContent(
  folderPath: string,
): Promise<Array<{ fileName: string; content: string }>> {
  const htmlFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith('.html'));

  const filesData: Array<{ fileName: string; content: string }> = [];
  for (const file of htmlFiles) {
    const filePath = path.join(folderPath, file);
    const content = await fs.promises.readFile(filePath, 'utf-8');
    filesData.push({ fileName: file, content });
  }

  return filesData;
}

const getFolderPath = (folderName: string): string => {
  const userDataPath = app.getPath('userData');
  return join(userDataPath, folderName);
};

export const requestLLM = async (
  question: string,
  documents: Document[],
  onChunk?: (chunk?: string) => void,
  printInConsole = true,
): Promise<string> => {
  const llm = new ChatOllama({
    model: 'llama3.1:latest', // or any other model you prefer
    baseUrl: 'http://localhost:11434', // adjust if your Ollama instance is running elsewhere
  });
  const prompt = ChatPromptTemplate.fromTemplate(`
    Answer the question based on the provided website documentation (html format). If asked for code:
    1. Always include necessary imports in your answer.
    2. Specify the correct programming language at the beginning of each code block.
    3. Provide complete, runnable code snippets when possible.
    Be concise in your explanations. Don't comment on your answer.
    Context: {context}
    Question: {question}`);
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
};
