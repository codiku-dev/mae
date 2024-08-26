import { BrowserWindow } from 'electron';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function logToRenderer(
  mainWindow: BrowserWindow | null,
  message: string,
) {
  mainWindow?.webContents.executeJavaScript("console.log('" + message + "');");
}
