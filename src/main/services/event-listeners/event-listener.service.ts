import { BrowserWindow, clipboard, globalShortcut, ipcMain } from 'electron';

export class EventListenersService {
  private mainWindow: BrowserWindow | null = null;

  constructor(mainWindow: BrowserWindow | null) {
    this.mainWindow = mainWindow;
  }

  // eslint-disable-next-line no-use-before-define
  private static instance: EventListenersService | null = null;

  public static getInstance(
    mainWindow: BrowserWindow | null,
  ): EventListenersService {
    if (!EventListenersService.instance) {
      EventListenersService.instance = new EventListenersService(mainWindow);
    }
    return EventListenersService.instance;
  }

  public addMainEventListeners() {
    this.addCmdSListeners();
    this.addRendererLogListener();
    this.addIgnoreMouseEventListener();
    this.addFocusRequestListener();
    this.addBlurListener();
    this.addCopyTextToClipboardRequestListener();
    this.addCloseRequestListener();
  }

  private addFocusRequestListener() {
    ipcMain.on('request-focus-window', () => {
      this.mainWindow?.focus();
    });
  }

  private addCloseRequestListener() {
    ipcMain.on('request-close-window', () => {
      this.mainWindow?.hide();
    });
  }
  private addBlurListener() {
    this.mainWindow?.on('blur', () => {
      this.mainWindow?.webContents.send('on-main-window-blur');
    });
  }

  private addIgnoreMouseEventListener() {
    ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      win?.setIgnoreMouseEvents(ignore, options);
    });
  }

  private addRendererLogListener() {
    ipcMain.on('log', (event, args) => {
      console.log('Log renderer : ', args);
    });
  }

  private addCmdSListeners() {
    let lastCallTime = 0;
    const debounceTime = 500; // Prevent spam

    globalShortcut.register('CommandOrControl+Shift+P', () => {
      if (this.mainWindow?.isVisible() === false) {
        this.mainWindow?.show();
      }
      const currentTime = Date.now();
      if (currentTime - lastCallTime >= debounceTime) {
        lastCallTime = currentTime;
        this.mainWindow?.webContents.send('global-shortcut', {
          data: { shortcut: 'CommandOrControl+Shift+P' },
        });
      }
    });
    globalShortcut.register('Escape', () => {
      this.mainWindow?.webContents.send('global-shortcut', {
        data: { shortcut: 'Escape' },
      });
    });
  }

  private addCopyTextToClipboardRequestListener() {
    ipcMain.on('copy-text-to-clipboard-request', (event, text) => {
      clipboard.writeText(text);
    });
  }
}
