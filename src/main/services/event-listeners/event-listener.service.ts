import { refreshMenuLabels } from '@/main/menu/menu';
import { StoreType } from '@/renderer/hooks/use-persistent-store';
import { ROUTES } from '@/renderer/libs/routes';
import { beforeStart } from '@/scripts/before-start';
import {
  BrowserWindow,
  clipboard,
  globalShortcut,
  ipcMain,
  Menu,
  shell,
} from 'electron';
import ElectronStore from 'electron-store';
// import { logToRenderer } from '../../../libs/utils';
import { username } from 'username';

export class EventListenersService {
  private mainWindow: BrowserWindow | null = null;

  private contextMenu: Menu | null = null;
  private persistentStore: ElectronStore<StoreType>;
  constructor(
    mainWindow: BrowserWindow | null,
    contextMenu: Menu,
    persistentStore: ElectronStore<StoreType>,
  ) {
    this.mainWindow = mainWindow;
    this.contextMenu = contextMenu;
    this.persistentStore = persistentStore;
  }

  // eslint-disable-next-line no-use-before-define
  private static instance: EventListenersService | null = null;

  public static getInstance(
    mainWindow: BrowserWindow | null,
    contextMenu: Menu,
    persistentStore: ElectronStore<StoreType>,
  ): EventListenersService {
    if (!EventListenersService.instance) {
      EventListenersService.instance = new EventListenersService(
        mainWindow,
        contextMenu,
        persistentStore,
      );
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
    this.addNavigateRequestListener();
    this.addOnSearchbarVisibiltyChangeRequestListener();
  }

  private addFocusRequestListener() {
    ipcMain.on('request-focus-window', () => {
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

  private addRequestOpenWindowListener() {
    ipcMain.on('request-open-window', () => {
      this.mainWindow?.show();
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

  private addNavigateRequestListener() {
    ipcMain.on('navigate', (pathEvent, pathValue) => {
      const path = pathValue || pathEvent;
      global.path = path;
      if (path !== ROUTES.home) {
        global.isSearchOpen = false;
      }
      this.mainWindow?.webContents.send('navigate', path);
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
      this.mainWindow?.webContents.send(
        'electron-store-changed',
        JSON.stringify(this.persistentStore.store),
      );
    });
  }

  private addOnSearchbarVisibiltyChangeRequestListener() {
    ipcMain.on('on-searchbar-visibilty-change', (event, isVisible) => {
      global.isSearchOpen = isVisible;
      refreshMenuLabels();
    });
  }
}
