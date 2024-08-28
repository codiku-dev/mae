import { getResourcesPath } from '@/libs/utils';
import { BrowserWindow, Menu, Tray, app, dialog, nativeImage } from 'electron';
import { pullOllamaModel } from '../../scripts/ollama/ollama.commands';
import { OllamaConfig } from '../services/ollama/ollama.config';
const MENU = {
  UPDATE_MODEL: 1,
  QUIT: 2,
  OPEN_CLOSE: 3,
};

let tray: Tray;
let contextMenu: Menu;

export function initMenu(mainWindow: BrowserWindow) {
  setIcon();
  contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Mia (⌘+⇧+p)',
      click: () => {
        if (!mainWindow.isVisible()) {
          mainWindow.show();
        }
        mainWindow.webContents.send('global-shortcut', {
          data: { shortcut: 'CommandOrControl+Shift+P' },
        });
        console.log('Start conversation');
      },
      commandId: MENU.OPEN_CLOSE,
    },
    {
      label: 'Update AI model',
      click: updateModel,
      commandId: MENU.UPDATE_MODEL,
    },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      },
      commandId: MENU.QUIT,
    },
  ]);

  // listener to window visibility to update menu label
  mainWindow.on('show', () => {
    console.log('show');
    console.log('update labl to Close Mia (⌘+⇧+p)');

    updateMenuLabel(MENU.OPEN_CLOSE, 'Close Mia (⌘+⇧+p)');
  });
  mainWindow.on('hide', () => {
    console.log('hide');
    console.log('update labl to Open Mia (⌘+⇧+p)');
    updateMenuLabel(MENU.OPEN_CLOSE, 'Open Mia (⌘+⇧+p)');
  });
  tray.setContextMenu(contextMenu);
}

async function updateModel() {
  updateMenuLabel(
    MENU.UPDATE_MODEL,
    'Update AI model : (Update in progress...)',
  );
  await pullOllamaModel(OllamaConfig.baseModel);

  const response = dialog.showMessageBoxSync({
    type: 'info',
    buttons: ['Restart Mia'],
    title: 'Restart Required',
    message: 'Please restart the application to apply the updates.',
  });

  if (response === 0) {
    console.log('Restarting Mia');
    app.relaunch();
    app.quit();
  }
}

function updateMenuLabel(commandId: number, newLabel: string) {
  const menuItem = contextMenu.items.find(
    (item) => item.commandId === commandId,
  );
  if (menuItem) {
    menuItem.label = newLabel;
    contextMenu = Menu.buildFromTemplate(contextMenu.items);
    tray.setContextMenu(contextMenu);
  }
}

function setIcon() {
  console.log('path', getResourcesPath('/assets/icons/16x16.png'));
  const icon = nativeImage.createFromPath(
    getResourcesPath('/assets/icons/16x16.png'),
  );
  tray = new Tray(icon);
}
