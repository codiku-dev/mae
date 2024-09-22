import { BrowserWindow, globalShortcut } from 'electron';

export function addShortcutListeners(mainWindow: BrowserWindow | null) {
  let lastCallTime = 0;
  const debounceTime = 500; // Prevent spam

  globalShortcut.register('CommandOrControl+Shift+P', () => {
    if (mainWindow?.isVisible() === false) {
      mainWindow?.show();
    }
    const currentTime = Date.now();
    if (currentTime - lastCallTime >= debounceTime) {
      lastCallTime = currentTime;
      mainWindow?.webContents.send('global-shortcut', {
        data: { shortcut: 'CommandOrControl+Shift+P' },
      });
    }
  });

  //   globalShortcut.register('Escape', () => {
  //     mainWindow?.webContents.send('global-shortcut', {
  //       data: { shortcut: 'Escape' },
  //     });
  //   });
}
