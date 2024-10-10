import { logToMain } from '@/renderer/libs/utils';

export class WindowAPI {
  public static async showWindow() {
    logToMain('SHOWING WINDOW');
    return await window.electron.ipcRenderer.invoke('request-open-window');
  }

  public static async hideWindow() {
    logToMain('HIDING WINDOW');
    return await window.electron.ipcRenderer.invoke('request-close-window');
  }

  public static toggleWindowWithAnimation(isVisible: boolean) {
    return window.electron.ipcRenderer.invoke(
      'request-open-window-with-animation',
      isVisible,
    );
  }
}
