export class ApplicationAPI {
  public static async getUserInfo(): Promise<string> {
    return await window.electron.ipcRenderer.invoke('user-info-request');
  }

  public static log(message: any) {
    window.electron.ipcRenderer.invoke('log', message);
  }

  public static openExternalLink(link: string) {
    window.electron.ipcRenderer.invoke('request-open-external-link', link);
  }

  public static async setAppAutoLaunch(enable: boolean) {
    return await window.electron.ipcRenderer.invoke(
      'toggle-app-auto-launch',
      enable,
    );
  }

  public static async isAppPackaged(): Promise<boolean> {
    return await window.electron.ipcRenderer.invoke('is-app-packaged');
  }

  public static copyTextToClipboard(text: string) {
    window.electron.ipcRenderer.invoke('copy-text-to-clipboard-request', text);
  }
}
