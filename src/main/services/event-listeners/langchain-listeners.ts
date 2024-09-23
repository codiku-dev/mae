import { BrowserWindow, ipcMain } from 'electron';
import { WebsiteScrapedContent } from '@/renderer/hooks/use-app-store';
import { docVectorStoreService } from '../doc-vector-store/doc-vector-service';
import { logToRenderer } from '@/libs/utils';

export function addLangchainListeners(mainWindow: BrowserWindow | null) {
  ipcMain.handle('sandbox-request', () => {});

  ipcMain.handle(
    'langchain-learn',
    async (event, websites: WebsiteScrapedContent[]) => {
      await docVectorStoreService.addDocs(websites);
    },
  );

  ipcMain.handle(
    'delete-langchain-doc',
    async (event, data: { url: string; partial: boolean }) => {
      const docsToDelete = await docVectorStoreService.getDocsByMetadata(
        'url',
        data.url,
        data.partial,
      );

      const deletePromises = docsToDelete.map((doc) => {
        logToRenderer(
          mainWindow,
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

  ipcMain.handle(
    'langchain-find-relevant-document',
    async (event, question: string) => {
      console.log('Start doc search');
      const relevantDocuments = await docVectorStoreService.searchDocs(
        question,
        3,
      );

      const aggregation = relevantDocuments?.map((r) => r.pageContent).join('');
      return aggregation;
    },
  );
}
