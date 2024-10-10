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

        return docsToDelete.map((d) => d.document.id);
      },
    );

    ipcMain.handle('delete-all-vector-doc', async () => {
      await docVectorStoreService.deleteAllDocs();
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
        return aggregation || '';
      },
    );

    ipcMain.handle(
      'add-doc-in-memory',
      async (event, websites: WebsiteScrapedContent[]) => {
        await docVectorStoreService.addDocInMemory(websites);
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
      return relevantDocAggregation;
    });

    ipcMain.handle('delete-all-doc-in-memory', async (event) => {
      await docVectorStoreService.deleteAllDocsInMemory();
      return 'ok';
    });
    console.log('DocVectorStoreController initialized');
  }
}
