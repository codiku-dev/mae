import { ipcMain } from 'electron';
import { ApplicationController } from './modules/application/application-controller';
import { DocVectorStoreController } from './modules/doc-vector-store/doc-vector-store-controller';
import { HttpController } from './modules/http/http-controller';
import { MenuController } from './modules/menu/menu-controller';
import { OllamaController } from './modules/ollama/ollama-controller';
import { SearchbarController } from './modules/searchbar/searchbar-controller';
import { ShortcutController } from './modules/shortcuts/shortcut-controller';
import { WindowController } from './modules/window/window-controller';
import { ollamaService } from './modules/ollama/ollama.service';
import { docVectorStoreService } from './modules/doc-vector-store/doc-vector-store-service';
import { menuService } from './modules/menu/menu-service';
import { windowService } from './modules/window/window.service';

export class OnStart {
  private static instance: OnStart | null = null;

  private constructor() {
    this.init();
  }

  public init() {
    new WindowController();
    new ApplicationController();
    new MenuController();
    new HttpController();
    new DocVectorStoreController();
    new SearchbarController();
    new ShortcutController();
    new OllamaController();

    ipcMain.on('request-before-start', async () => {
      await ollamaService.restart();
      try {
        await ollamaService.preloadDefaultModel();
        await docVectorStoreService.init();
      } catch (error) {
        console.log("'request-before-start error", error);
      }
      menuService.initMenu();
      windowService.getMainWindow().webContents.send('before-start-reply');
    });
  }

  public static getInstance(): OnStart {
    if (!OnStart.instance) {
      OnStart.instance = new OnStart();
    }
    return OnStart.instance;
  }
}
