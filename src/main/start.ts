import { LANGUAGES } from '@/libs/languages';
import { StoreType } from '@/renderer/hooks/use-persistent-store';
import { BrowserWindow } from 'electron';
import ElectronStore from 'electron-store';
import { initMenu } from './menu/menu';
import { EventListenersService } from './services/event-listeners/event-listener.service';

export async function start(mainWindow: BrowserWindow) {
  const persistentStore = new ElectronStore<StoreType>({
    schema: {
      isAppLoading: {
        type: 'boolean',
        default: true,
      },
      assistantLanguage: {
        type: 'string',
        default: LANGUAGES.en.code,
      },

      availableModels: {
        type: 'array',
        default: [],
      },
      lastFetchAvailableModelsISODate: {
        type: 'string',
        default: '',
      },
    },
  });

  mainWindow.setFocusable(true);
  if (global.DEBUG) {
    mainWindow.webContents.openDevTools();
  }
  const contextMenu = initMenu(mainWindow);

  const eventListenerService = new EventListenersService(
    mainWindow,
    contextMenu,
    persistentStore,
  );
  eventListenerService.addMainEventListeners();
  console.log('Mia: Mia fully started');
}
