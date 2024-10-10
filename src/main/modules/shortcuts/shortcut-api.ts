import { logToMain } from '@/renderer/libs/utils';

export class ShortcutAPI {
  public static addGlobalShortcutListener(
    callback: (shortcut: string) => void,
  ) {
    return window.electron.ipcRenderer.once('global-shortcut', (shortcut) => {
      return callback(shortcut);
    });
  }

  public static removeGlobalShortcutListener(
    callback: (shortcut: string) => void,
  ) {
    window.electron.ipcRenderer.removeListener('global-shortcut', callback);
  }
}
