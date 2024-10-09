export class OllamaAPI {
  public static onInstallationProgress(progressFn: (output: string) => void) {
    window.electron.ipcRenderer.on('install-ollama-progress', progressFn);
  }

  public static removeInstallationProgressListener(
    progressFn: (output: string) => void,
  ) {
    window.electron.ipcRenderer.removeListener(
      'install-ollama-progress',
      progressFn,
    );
  }

  public static async pullOllamaModel(modelName: string) {
    return await window.electron.ipcRenderer.invoke(
      'pull-ollama-model',
      modelName,
    );
  }
  public static async installOllama() {
    return await window.electron.ipcRenderer.invoke('install-ollama');
  }

  public static async checkOllamaInstalled() {
    return await window.electron.ipcRenderer.invoke('check-ollama-installed');
  }
}
