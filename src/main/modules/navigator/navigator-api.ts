import { logToMain } from '@/renderer/libs/utils';

export class NavigatorAPI {
  public static async navigate(pathValue: string) {
    window.electron.ipcRenderer.sendMessage('navigate', pathValue);
  }

  public static onNavigate(callback: (pathValue: string) => void): () => void {
    return window.electron.ipcRenderer.on('navigate', (event, pathValue) => {
      callback(event || pathValue);
    });
  }

  public static removeNavigateListener(callback: (pathValue: string) => void) {
    window.electron.ipcRenderer.removeListener('navigate', callback);
  }
}
