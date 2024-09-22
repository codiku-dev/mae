import { BrowserWindow, ipcMain, net } from 'electron';

export function addHttpListeners(mainWindow: BrowserWindow | null) {
  ipcMain.handle('make-http-request', async (event, url) => {
    console.log('Fetching:', url);

    const response = await net.fetch(url);
    const text = await response.text();
    return text;
  });
}
