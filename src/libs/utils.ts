import { BrowserWindow } from 'electron';
import path from 'path';

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
