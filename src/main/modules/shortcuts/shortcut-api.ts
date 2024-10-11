import { logToMain } from '@/renderer/libs/utils';

export class ShortcutAPI {
  public static addGlobalShortcutListener(
    callback: (shortcut: string) => void,
  ): () => void {
    return window.electron.ipcRenderer.on('global-shortcut', (shortcut) => {
      callback(shortcut);
    });
  }
}
