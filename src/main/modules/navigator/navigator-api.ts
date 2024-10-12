export class NavigatorAPI {
  public static async navigate(route: string) {
    return await window.electron.ipcRenderer.invoke('navigate', route);
  }

  public static addNavigateListener(
    callback: (event: Electron.IpcRendererEvent, route: string) => void,
  ) {
    return window.electron.ipcRenderer.on('navigate', callback);
  }

  public static updateRoutePath(route: string) {
    window.electron.ipcRenderer.invoke('update-route-path', route);
  }
}
