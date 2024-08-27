import { getResourcesPath } from '@/libs/utils';
import { BrowserWindow, Menu, Tray, app, dialog, nativeImage } from 'electron';
import { pullOllamaModel } from '../../scripts/ollama/ollama.commands';
const MENU = {
  UPDATE_MODEL: 1,
  QUIT: 2,
};

let tray: Tray;
let contextMenu: Menu;

export function initMenu(mainWindow: BrowserWindow) {
  setIcon();
  contextMenu = Menu.buildFromTemplate([
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

  tray.setToolTip('⌘+⇧+p to start conversation');
  tray.setContextMenu(contextMenu);
}

async function updateModel() {
  updateMenuLabel(
    MENU.UPDATE_MODEL,
    'Update AI model : (Update in progress...)',
  );
  await pullOllamaModel('llama3.1');

  const response = dialog.showMessageBoxSync({
    type: 'info',
    buttons: ['Restart Mia'],
    title: 'Restart Required',
    message: 'Please restart the application to apply the updates.',
  });

  if (response === 0) {
    console.log('Restarting Mia');
    app.relaunch();
    app.exit();
  }
}

function updateMenuLabel(commandId: number, newLabel: string) {
  const menuItem = contextMenu.items.find(
    (item) => item.commandId === commandId,
  );
  if (menuItem) {
    menuItem.label = newLabel;
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
