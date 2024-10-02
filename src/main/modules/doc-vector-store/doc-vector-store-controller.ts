import { BrowserWindow, ipcMain } from 'electron';
import { WebsiteScrapedContent } from '@/renderer/hooks/use-search';
import { docVectorStoreService } from './doc-vector-store-service';
import { logToRenderer } from '@/libs/utils';
import { windowService } from '../window/window.service';

export class DocVectorStoreController {
  constructor() {
    ipcMain.handle('sandbox-request', () => {});

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
            windowService.getMainWindow(),
            `Preparing delete promise for documentId ${doc.recordId}`,
          );
          return docVectorStoreService.deleteDoc(doc.recordId);
        });

        await Promise.all(deletePromises);

        return docsToDelete.map((d) => d.document.id);
      },
    );

    ipcMain.handle('delete-all-langchain-doc', async () => {
      await docVectorStoreService.deleteAllDocs();
    });

    ipcMain.handle('find-vector-doc', async (event, question: string) => {
      console.log('Start doc search');
      const relevantDocuments = await docVectorStoreService.searchDocs(
        question,
        3,
      );

      const aggregation = relevantDocuments?.map((r) => r.pageContent).join('');
      return aggregation;
    });

    ipcMain.handle(
      'add-doc-in-memory',
      async (event, websites: WebsiteScrapedContent[]) => {
        console.log('add-doc-in-memory');
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
      console.log('delete-all-doc-in-memory');
      await docVectorStoreService.deleteAllDocsInMemory();
      return 'ok';
    });
  }
}
