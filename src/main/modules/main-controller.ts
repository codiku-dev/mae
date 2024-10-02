import { DocVectorStoreController } from './doc-vector-store/doc-vector-store-controller';
import { HttpController } from './http/http-controller';
import { OllamaController } from './ollama/ollama-controller';
import { WindowController } from './window/window-controller';
import { ShortcutController } from './shortcuts/shortcut-controller';
import { MenuController } from './menu/menu-controller';
import { SearchbarController } from './searchbar/searchbar-controller';
import { ApplicationController } from './application/application-controller';

export class MainController {
  constructor() {
    new WindowController();
    new ApplicationController();
    new MenuController();
    new HttpController();
    new DocVectorStoreController();
    new SearchbarController();
    new ShortcutController();
    new OllamaController();
  }
}
