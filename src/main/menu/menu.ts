import { getResourcesPath } from '@/libs/utils';
import { BrowserWindow, Menu, Tray, app, dialog, nativeImage } from 'electron';
import { pullOllamaModel } from '../../scripts/ollama/ollama.commands';
import { OllamaConfig } from '../services/ollama/ollama.config';
const MENU = {
  UPDATE_MODEL: {
    id: 1,
    label: 'Update AI model',
  },
  QUIT: {
    id: 2,
    label: 'Quit',
  },
  OPEN_CLOSE: {
    id: 3,
    label: 'Open Mia (⌘+⇧+p)',
  },
};

let tray: Tray = null;
let contextMenu: Menu;
let iconUpdateInterval: NodeJS.Timeout | null = null;

export function initMenu(mainWindow: BrowserWindow) {
  setIcon();
  contextMenu = Menu.buildFromTemplate([
    {
      label: MENU.OPEN_CLOSE.label,
      click: () => {
        if (!mainWindow.isVisible()) {
          mainWindow.show();
        }
        mainWindow.webContents.send('global-shortcut', {
          data: { shortcut: 'CommandOrControl+Shift+P' },
        });
      },
      commandId: MENU.OPEN_CLOSE.id,
    },
    {
      label: MENU.UPDATE_MODEL.label,
      click: updateModel,
      commandId: MENU.UPDATE_MODEL.id,
    },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      },
      commandId: MENU.QUIT.id,
    },
  ]);

  // listener to window visibility to update menu label
  mainWindow.on('show', () => {
    updateMenuLabel(MENU.OPEN_CLOSE.id, 'Close Mia (⌘+⇧+p)');
  });

  mainWindow.on('hide', () => {
    updateMenuLabel(MENU.OPEN_CLOSE.id, 'Open Mia (⌘+⇧+p)');
  });
  tray.setContextMenu(contextMenu);
}

async function updateModel() {
  updateMenuLabel(
    MENU.UPDATE_MODEL.id,
    'Update AI model : (Update in progress...)',
  );
  startIconWarningUpdate();
  await pullOllamaModel(OllamaConfig.baseModel);
  stopIconUpdate();
  setIcon();

  updateMenuLabel(MENU.UPDATE_MODEL.id, 'Update AI model');

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
  const icon = nativeImage.createFromPath(
    getResourcesPath('/assets/icons/16x16.png'),
  );
  if (tray) {
    tray.setImage(icon);
  } else {
    tray = new Tray(icon);
  }
}

function startIconWarningUpdate() {
  let isWarning = false;
  iconUpdateInterval = setInterval(() => {
    const iconPath = isWarning
      ? getResourcesPath('/assets/icons/16x16-warning.png')
      : getResourcesPath('/assets/icons/16x16.png');
    const icon = nativeImage.createFromPath(iconPath);
    tray.setImage(icon);
    isWarning = !isWarning;
  }, 800);
}

function stopIconUpdate() {
  if (iconUpdateInterval) {
    clearInterval(iconUpdateInterval);
    iconUpdateInterval = null;
  }
}
