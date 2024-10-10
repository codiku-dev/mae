import { WebsiteScrapedContent } from '@/renderer/hooks/use-search';
import { DocumentInterface } from '@langchain/core/documents';

export class DocVectorStoreAPI {
  public static async findDoc(query: string): Promise<string> {
    return await window.electron.ipcRenderer.invoke('find-vector-doc', query);
  }

  public static async addDocs(documents: WebsiteScrapedContent[]) {
    return await window.electron.ipcRenderer.invoke(
      'add-vector-docs',
      documents,
    );
  }
  public static async deleteDoc(docMetadata: {
    url: string;
    partial: boolean;
  }): Promise<
    {
      recordId: string;
      document: Document;
    }[]
  > {
    return await window.electron.ipcRenderer.invoke(
      'delete-vector-doc',
      docMetadata,
    );
  }

  public static async deleteAllDocs() {
    return await window.electron.ipcRenderer.invoke('delete-all-vector-doc');
  }

  public static async findDocInMemory(query: string): Promise<string> {
    return await window.electron.ipcRenderer.invoke(
      'search-doc-in-memory',
      query,
    );
  }

  public static async addDocInMemory(websites: WebsiteScrapedContent[]) {
    return await window.electron.ipcRenderer.invoke(
      'add-doc-in-memory',
      websites,
    );
  }

  public static async deleteAllDocsInMemory() {
    return await window.electron.ipcRenderer.invoke('delete-all-doc-in-memory');
  }
}
