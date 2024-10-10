import { logToRenderer } from '@/libs/utils';
import { WebsiteScrapedContent } from '@/renderer/hooks/use-search';
import { ipcMain } from 'electron';
import { docVectorStoreService } from './doc-vector-store-service';

export class DocVectorStoreController {
  constructor() {
    ipcMain.handle(
      'add-vector-docs',
      async (event, websites: WebsiteScrapedContent[]) => {
        await docVectorStoreService.addDocs(websites);
        console.log('Event handled: add-vector-docs');
      },
    );

    ipcMain.handle(
      'delete-vector-doc',
      async (event, data: { url: string; partial: boolean }) => {
        const docsToDelete = await docVectorStoreService.getDocsByMetadata(
          'url',
          data.url,
          data.partial,
        );

        const deletePromises = docsToDelete.map((doc) => {
          logToRenderer(
            `Preparing delete promise for documentId ${doc.recordId}`,
          );
          logToRenderer(
            'the metadata' + JSON.stringify(doc.document?.metadata),
          );
          return docVectorStoreService.deleteDoc(doc.recordId);
        });

        await Promise.all(deletePromises);
        console.log('Event handled: delete-vector-doc');
        return docsToDelete.map((d) => d.document.id);
      },
    );

    ipcMain.handle('delete-all-vector-doc', async () => {
      await docVectorStoreService.deleteAllDocs();
      console.log('Event handled: delete-all-vector-doc');
    });

    ipcMain.handle(
      'find-vector-doc',
      async (event, question: string): Promise<string> => {
        const relevantDocuments = await docVectorStoreService.searchDocs(
          question,
          3,
        );

        const aggregation = relevantDocuments
          ?.map((r) => r.pageContent)
          .join('');
        console.log('Event handled: find-vector-doc');
        return aggregation || '';
      },
    );

    ipcMain.handle(
      'add-doc-in-memory',
      async (event, websites: WebsiteScrapedContent[]) => {
        await docVectorStoreService.addDocInMemory(websites);
        console.log('Event handled: add-doc-in-memory');
      },
    );

    ipcMain.handle('search-doc-in-memory', async (event, question: string) => {
      const relevantDocuments = await docVectorStoreService.searchDocsInMemory(
        question,
        3,
      );
      const relevantDocAggregation = relevantDocuments
        ?.map((r) => r.pageContent)
        .join('');
      console.log('Event handled: search-doc-in-memory');
      return relevantDocAggregation;
    });

    ipcMain.handle('delete-all-doc-in-memory', async (event) => {
      await docVectorStoreService.deleteAllDocsInMemory();
      console.log('Event handled: delete-all-doc-in-memory');
      return 'ok';
    });

    console.log('DocVectorStoreController initialized');
  }
}
