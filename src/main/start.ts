import { BrowserWindow } from 'electron';
import { initMenu } from './menu/menu';
import { EventListenersService } from './services/event-listeners/event-listener.service';

export async function start(mainWindow: BrowserWindow) {
  console.log('Mia: Set focusable to true');
  mainWindow.setFocusable(true);
  console.log('Mia: Open dev tools');
  if (global.DEBUG) {
    mainWindow.webContents.openDevTools();
  }
  console.log('Mia: Add main event listeners');
  const contextMenu = initMenu(mainWindow);

  const eventListenerService = new EventListenersService(
    mainWindow,
    contextMenu,
  );
  eventListenerService.addMainEventListeners();
  console.log('Mia: Init menu');
  console.log('Mia: Mia fully started');
}
