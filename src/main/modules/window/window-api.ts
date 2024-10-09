export class WindowAPI {
  public static async showWindow() {
    return await window.electron.ipcRenderer.invoke('request-open-window');
  }

  public static async hideWindow() {
    return await window.electron.ipcRenderer.invoke('request-close-window');
  }
}
