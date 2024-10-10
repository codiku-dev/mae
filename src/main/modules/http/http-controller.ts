import { ipcMain } from 'electron';
import { httpService } from './http-service';

export class HttpController {
  constructor() {
    ipcMain.handle('fetch-text', async (event, url) => {
      return await httpService.fetchText(event, url);
    });
    console.log('HttpController initialized');
  }
}
