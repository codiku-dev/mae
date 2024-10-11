import { logToMain } from '@/renderer/libs/utils';
import { ipcRenderer } from 'electron';

export class NavigatorAPI {
  public static async navigate(route: string) {
    return await window.electron.ipcRenderer.invoke('navigate', route);
  }

  public static addNavigateListener(
    callback: (event: Electron.IpcRendererEvent, route: string) => void,
  ) {
    window.electron.ipcRenderer.on('navigate', callback);
  }

  public static removeNavigateListener(
    callback: (event: Electron.IpcRendererEvent, route: string) => void,
  ) {
    window.electron.ipcRenderer.removeListener('navigate', callback);
  }

  public static updateRoutePath(route: string) {
    window.electron.ipcRenderer.invoke('update-route-path', route);
  }
}
