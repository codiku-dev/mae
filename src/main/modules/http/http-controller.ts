import { ipcMain } from 'electron';
import { httpService } from './http-service';

export class HttpController {
  constructor() {
    ipcMain.handle('fetch-text', async (event, url) => {
      const result = await httpService.fetchText(event, url);
      console.log('Event handled: fetch-text');
      return result;
    });
    console.log('HttpController initialized');
  }
}
