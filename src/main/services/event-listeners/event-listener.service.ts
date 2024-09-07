import { beforeStart } from '@/scripts/before-start';
import {
  BrowserWindow,
  clipboard,
  globalShortcut,
  ipcMain,
  shell,
} from 'electron';
// import { logToRenderer } from '../../../libs/utils';
import { username } from 'username';

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
    if (!global.DEBUG) {
      this.addIgnoreMouseEventListener();
    }
    this.addFocusRequestListener();
    this.addBlurListener();
    this.addCopyTextToClipboardRequestListener();
    this.addCloseRequestListener();
    this.addBlurRequestListener();
    this.addUserInfoRequestListener();
    this.addRequestOpenExternalLinkListener();
    this.addBeforeStartRequestListener();
  }

  private addFocusRequestListener() {
    ipcMain.on('request-focus-window', () => {
      console.log('MIA main : FOCUSING');
      this.mainWindow?.focus();
    });
  }

  private addBeforeStartRequestListener() {
    ipcMain.on('request-before-start', async () => {
      await beforeStart();
      this.mainWindow?.webContents.send('before-start-reply');
    });
  }

  private addBlurRequestListener() {
    ipcMain.on('request-blur-window', () => {
      this.mainWindow?.blur();
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

  private addUserInfoRequestListener() {
    ipcMain.on('user-info-request', async () => {
      const user = await username();

      this.mainWindow?.webContents.send('user-info-reply', user);
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

  private addRequestOpenExternalLinkListener() {
    ipcMain.on('request-open-external-link', (event, link) => {
      shell.openExternal(link);
    });
  }

  private addCmdSListeners() {
    // logToRenderer(this.mainWindow, 'addCmdSListeners()');
    let lastCallTime = 0;
    const debounceTime = 500; // Prevent spam

    globalShortcut.register('CommandOrControl+Shift+P', () => {
      // logToRenderer(this.mainWindow, 'CommandOrControl+Shift+P');
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
