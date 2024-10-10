export class HttpAPI {
  public static async fetchText(url: string): Promise<string> {
    return await window.electron.ipcRenderer.invoke('fetch-text', url);
  }
}
