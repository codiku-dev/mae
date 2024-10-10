import { globalShortcut, ipcMain } from 'electron';
import { shortcutService } from './shortcut-service';

export class ShortcutController {
  constructor() {
    globalShortcut.register('CommandOrControl+Shift+P', () => {
      shortcutService.emitShortCut('CommandOrControl+Shift+P');
    });

    ipcMain.handle('register-shortcut', async (event, shortcut: string) => {
      // Existing code...
      console.log('Event handled: register-shortcut');
    });

    ipcMain.handle('unregister-shortcut', async (event, shortcut: string) => {
      // Existing code...
      console.log('Event handled: unregister-shortcut');
    });

    console.log('ShortcutController initialized');
  }
}
