import { getResourcesPath } from '@/libs/utils';
import { BrowserWindow, Menu, Tray, app, ipcMain, nativeImage } from 'electron';
import { ROUTES } from '../../renderer/libs/routes';

const MENU = {
  // UPDATE_MODEL: {
  //   id: 1,
  //   label: 'Update AI model',
  // },
  QUIT: {
    id: 2,
    label: 'Quit',
  },
  OPEN_CLOSE: {
    id: 3,
    label: 'Open Mia (⌘+⇧+p)',
  },
  SETTINGS: {
    id: 4,
    label: 'Settings',
  },
};

let tray: Tray | null = null;
let contextMenu: Menu;
let iconUpdateInterval: NodeJS.Timeout | null = null;

export function initMenu(mainWindow: BrowserWindow): Menu {
  setIcon();
  contextMenu = Menu.buildFromTemplate([
    {
      label: MENU.OPEN_CLOSE.label,
      click: () => {
        ipcMain.emit('navigate', ROUTES.home);
        if (!mainWindow.isVisible()) {
          mainWindow.show();
        }
        setTimeout(() => {
          mainWindow.webContents.send('global-shortcut', {
            data: { shortcut: 'CommandOrControl+Shift+P' },
          });

          refreshMenuLabels();
        }, 100);
      },
      commandId: MENU.OPEN_CLOSE.id,
    },
    {
      label: MENU.SETTINGS.label,
      click: () => {
        ipcMain.emit('navigate', ROUTES.settings);
        mainWindow.show();
        setTimeout(() => {
          refreshMenuLabels();
        }, 100);
      },
      commandId: MENU.SETTINGS.id,
    },
    // {
    //   label: MENU.UPDATE_MODEL.label,
    //   click: updateModel,
    //   commandId: MENU.UPDATE_MODEL.id,
    // },
    {
      label: MENU.QUIT.label,
      click: () => {
        app.quit();
      },
      commandId: MENU.QUIT.id,
    },
  ]);

  tray!.setContextMenu(contextMenu);

  return contextMenu;
}

function updateMenuLabel(commandId: number, newLabel: string) {
  const menuItem = contextMenu.items.find(
    (item) => item.commandId === commandId,
  );
  if (menuItem) {
    menuItem.label = newLabel;
    contextMenu = Menu.buildFromTemplate(contextMenu.items);
    tray!.setContextMenu(contextMenu);
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
    tray!.setImage(icon);
    isWarning = !isWarning;
  }, 800);
}

export function refreshMenuLabels() {
  updateMenuLabel(
    MENU.OPEN_CLOSE.id,
    global.isSearchOpen === true ? 'Close Mia (⌘+⇧+p)' : 'Open Mia (⌘+⇧+p)',
  );
}

// function stopIconUpdate() {
//   if (iconUpdateInterval) {
//     clearInterval(iconUpdateInterval);
//     iconUpdateInterval = null;
//   }
// }
