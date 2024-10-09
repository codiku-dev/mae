import { windowService } from '@/main/modules/window/window.service';
import path from 'path';
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function logToRenderer(message: string) {
  const escapedMessage = JSON.stringify(message);
  windowService
    .getMainWindow()
    ?.webContents.executeJavaScript(`console.log(${escapedMessage});`);
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
