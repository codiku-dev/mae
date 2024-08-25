// import { BrowserWindow, clipboard, app } from 'electron';
// import { LangChainService } from './services/langchain/langchain.service';
import { BrowserWindow } from 'electron';
import { initMenu } from './menu/menu';
import { EventListenersService } from './services/event-listeners/event-listener.service';
// import { LangChainService } from './services/langchain/langchain.service';
// import { OSService } from './services/os.service';

export async function start(mainWindow: BrowserWindow) {
  // LangChainService.getInstance();
  initMenu();
  const eventListenerService = new EventListenersService(mainWindow);
  eventListenerService.addMainEventListeners();
}
