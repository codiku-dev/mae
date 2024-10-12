import { ApplicationController } from './modules/application/application-controller';
import { DocVectorStoreController } from './modules/doc-vector-store/doc-vector-store-controller';
import { HttpController } from './modules/http/http-controller';
import { MenuController } from './modules/menu/menu-controller';
import { OllamaController } from './modules/ollama/ollama-controller';
import { ShortcutController } from './modules/shortcuts/shortcut-controller';
import { WindowController } from './modules/window/window-controller';
import { ollamaService } from './modules/ollama/ollama.-service';
import { docVectorStoreService } from './modules/doc-vector-store/doc-vector-store-service';
import { menuService } from './modules/menu/menu-service';
import { NavigatorController } from './modules/navigator/navigator-controller';

export class OnStart {
  private static instance: OnStart | null = null;

  private constructor() {
    this.init();
  }

  public async init() {
    new WindowController();
    new ApplicationController();
    new NavigatorController();
    new MenuController();
    new HttpController();
    new DocVectorStoreController();
    new ShortcutController();
    new OllamaController();

    //Todo : We don't know if ollama installed though, we should check that first
    await ollamaService.start();
    try {
      await ollamaService.warmupDefaultModel();
      await docVectorStoreService.init();
    } catch (error) {
      console.log("'request-before-start error", error);
    }
    menuService.initMenu();
  }

  public static getInstance(): OnStart {
    if (!OnStart.instance) {
      OnStart.instance = new OnStart();
    }
    return OnStart.instance;
  }
}
