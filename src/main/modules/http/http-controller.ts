import { ipcMain } from 'electron';
import { httpService } from './http-service';

export class HttpController {
  constructor() {
    ipcMain.handle('make-http-request', (event, url) => {
      httpService.makeHttpRequest(event, url);
    });
  }
}
