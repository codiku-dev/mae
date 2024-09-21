import { app } from 'electron';

import { BrowserWindow } from 'electron';
import path from 'path';
import { URL } from 'url';
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function logToRenderer(
  mainWindow: BrowserWindow | null,
  message: string,
) {
  mainWindow?.webContents.executeJavaScript("console.log('" + message + "');");
}

export function getResourcesPath(assetPath: string) {
  if (process.env.NODE_ENV === 'development') {
    return path.join(process.cwd(), assetPath);
  } else {
    return path.join(process.resourcesPath, assetPath);
  }
}

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}
