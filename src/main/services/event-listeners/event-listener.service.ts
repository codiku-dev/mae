import { beforeStart } from '@/scripts/before-start';
import {
  BrowserWindow,
  clipboard,
  globalShortcut,
  ipcMain,
  shell,
} from 'electron';
// import { logToRenderer } from '../../../libs/utils';
import Store from 'electron-store';
import { username } from 'username';

export type StoreType = {
  isFirstAppRun: boolean;
};

export class EventListenersService {
  private mainWindow: BrowserWindow | null = null;
  private persistentStore = new Store<StoreType>({ isFirstAppRun: true });

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
    this.addElectronStoreGetRequestListener();
    this.addElectronStoreSetRequestListener();
    this.addElectronStoreChangeListener();
    this.addElectronStoreGetAllRequestListener();
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
      this.mainWindow?.hide();
      this.mainWindow?.show();
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
      this.mainWindow?.webContents.send('global-shortcut', {
        data: { shortcut: 'CommandOrControl+Shift+P' },
      });
    });
  }

  private addCmdSListeners() {
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

  private addElectronStoreGetRequestListener() {
    ipcMain.on('electron-store-get', async (event, val) => {
      event.returnValue = this.persistentStore.get(val);
    });
  }

  private addElectronStoreSetRequestListener() {
    ipcMain.on('electron-store-set', (event, key, value) => {
      this.persistentStore.set(key, value);
    });
  }

  private addElectronStoreGetAllRequestListener() {
    ipcMain.on('electron-store-get-all', (event) => {
      event.returnValue = JSON.stringify(this.persistentStore.store);
    });
  }

  private addElectronStoreChangeListener() {
    this.persistentStore.onDidAnyChange(() => {
      ipcMain.on('electron-store-changed', (event, store) => {
        console.log('MIA main : electron-store-changed', store);
        return store.store;
      });
    });
  }
}
