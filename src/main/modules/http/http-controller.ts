import { ipcMain } from 'electron';
import { httpService } from './http-service';

export class HttpController {
  constructor() {
    ipcMain.handle('make-http-request', async (event, url) => {
      return await httpService.makeHttpRequest(event, url);
    });
    console.log('HttpController initialized');
  }
}
