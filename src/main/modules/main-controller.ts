import { ApplicationController } from './application/application-controller';
import { DocVectorStoreController } from './doc-vector-store/doc-vector-store-controller';
import { HttpController } from './http/http-controller';
import { MenuController } from './menu/menu-controller';
import { OllamaController } from './ollama/ollama-controller';
import { SearchbarController } from './searchbar/searchbar-controller';
import { ShortcutController } from './shortcuts/shortcut-controller';
import { WindowController } from './window/window-controller';

class MainController {
  private static instance: MainController | null = null;

  private constructor() {}

  public init() {
    new WindowController();
    new ApplicationController();
    new MenuController();
    new HttpController();
    new DocVectorStoreController();
    new SearchbarController();
    new ShortcutController();
    new OllamaController();
    console.log('INIT CONTROLLERS DONE');
  }

  public static getInstance(): MainController {
    if (!MainController.instance) {
      MainController.instance = new MainController();
    }
    return MainController.instance;
  }
}

export const mainController = MainController.getInstance();
