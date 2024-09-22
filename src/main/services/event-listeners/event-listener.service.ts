import { initMenu, refreshMenuLabels } from '@/main/menu/menu';
import {
  useAppStore,
  WebsiteScrapedContent,
} from '@/renderer/hooks/use-app-store';
import { ROUTES } from '@/renderer/libs/routes';
import { beforeStart } from '@/scripts/before-start';
import console from 'console';
var AutoLaunch = require('auto-launch');

import {
  App,
  BrowserWindow,
  clipboard,
  globalShortcut,
  ipcMain,
  net,
  shell,
} from 'electron';
import { username } from 'username';
import {
  langchainDemo,
  langchainService,
} from '../langchain/langchain-service';

export class EventListenersService {
  private mainWindow: BrowserWindow | null = null;
  constructor(
    private app: App,
    mainWindow: BrowserWindow | null,
  ) {
    this.mainWindow = mainWindow;
  }

  // eslint-disable-next-line no-use-before-define
  private static instance: EventListenersService | null = null;

  public static getInstance(
    mainWindow: BrowserWindow | null,
    app: App,
  ): EventListenersService {
    if (!EventListenersService.instance) {
      EventListenersService.instance = new EventListenersService(
        app,
        mainWindow,
      );
    }
    return EventListenersService.instance;
  }

  public addMainEventListeners() {
    this.addCmdSListeners();
    this.addRendererLogListener();
    // if (!global.DEBUG) {
    this.addIgnoreMouseEventListener();
    // }
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
    this.addMakeHttpRequestListener();
    this.addAutoLaunchListener();
    this.addSandboxListener();
    this.addLangchainLearnListener();
    this.addLangchainFindRelevantHTMLDocumentListener();
  }

  private addFocusRequestListener() {
    ipcMain.on('request-focus-window', () => {
      // this.mainWindow?.hide();
      // this.mainWindow?.show();
      this.mainWindow?.focus();
    });
  }

  private addBeforeStartRequestListener() {
    ipcMain.on('request-before-start', async () => {
      await beforeStart();
      initMenu(this.mainWindow!);
      console.log('Mia: finished pre start actions');
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

  private addOnSearchbarVisibiltyChangeRequestListener() {
    ipcMain.on('on-searchbar-visibilty-change', (event, isVisible) => {
      global.isSearchOpen = isVisible;
      refreshMenuLabels();
    });
  }
  private addMakeHttpRequestListener() {
    ipcMain.handle('make-http-request', async (event, url) => {
      console.log('Original url:', url);

      console.log('Fetching url:', url);
      const response = await net.fetch(url);
      const text = await response.text();
      return text;
    });
  }

  private addAutoLaunchListener() {
    ipcMain.handle('set-app-auto-launch', () => {
      var miaAutoLauncher = new AutoLaunch({
        name: 'Mia',
        path: '/Applications/Mia.app',
      });
      if (useAppStore.getState().isAppLaunchedOnStartup) {
        console.log('Mia: enabling auto launch');
        miaAutoLauncher.enable();
      } else {
        console.log('Mia: disabling auto launch');
        miaAutoLauncher.disable();
      }
    });
  }

  private addSandboxListener() {
    ipcMain.handle('sandbox-request', () => {
      langchainDemo();
    });
  }

  private addLangchainLearnListener() {
    ipcMain.handle(
      'langchain-learn',
      async (event, websites: WebsiteScrapedContent[]) => {
        await langchainService.addDocs(websites);
      },
    );
  }

  private addLangchainFindRelevantHTMLDocumentListener() {
    ipcMain.handle(
      'langchain-find-relevant-document',
      async (event, question: string) => {
        const relevantDocument = await langchainService.searchDocs(question, 1);
        return relevantDocument?.[0].pageContent;
      },
    );
  }
}
