import { App, BrowserWindow } from 'electron';
import { addDocVectorStoreListeners } from './doc-vector-store-listeners';
import { addHttpListeners } from './http-listeners';
import { addSearchbarListeners } from './searchbar-listeners';
import { addWindowListeners } from './window-listeners';
import { addShortcutListeners } from './shortcut-listeners';
import { addAppListeners } from './app-listeners';
import { addOllamaListeners } from './ollama-listeners';

export class EventListenersService {
  private mainWindow: BrowserWindow | null = null;
  private static instance: EventListenersService | null = null;

  private constructor(
    private app: App,
    mainWindow: BrowserWindow | null,
  ) {
    this.mainWindow = mainWindow;
  }

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
    addAppListeners(this.mainWindow);
    addDocVectorStoreListeners(this.mainWindow);
    addHttpListeners(this.mainWindow);
    addSearchbarListeners(this.mainWindow);
    addWindowListeners(this.mainWindow);
    addShortcutListeners(this.mainWindow);
    addOllamaListeners(this.mainWindow);
  }
}
