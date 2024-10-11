import { app, BrowserWindow, ipcMain, screen, shell } from 'electron';
import log from 'electron-log';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { resolveHtmlPath } from '../libs/utils';
import { windowService } from './modules/window/window.service';
import { onStop } from './on-stop';
import { OnStart } from './on-start';
import { ROUTES } from '@/routes';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}
app.disableHardwareAcceleration();

function initWindow(): BrowserWindow {
  // const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  global.DEBUG = true;
  let mainWindow = new BrowserWindow({
    height: 800,
    width: 800,
    transparent: true,
    frame: false,
    x: screen.getPrimaryDisplay().workAreaSize.width / 2 - 400, // Assuming a default width of 800
    y: 20, // Assuming a default height of 600
    // frame: global.DEBUG,
    // transparent: true,
    movable: global.DEBUG,
    hasShadow: false,
    show: false,
    // visualEffectState: 'inactive',
    resizable: global.DEBUG,
    // focusable: true,
    alwaysOnTop: true,
    useContentSize: false,
    modal: true,

    // modal: true,
    // backgroundColor: 'transparent',
    // vibrancy: 'under-window',
    vibrancy: 'fullscreen-ui', // on MacOS
    visualEffectState: 'active',
    webPreferences: {
      // devTools: false,

      devTools: global.DEBUG,
      nodeIntegration: true,
      contextIsolation: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  return mainWindow;
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', async () => {
  // if (process.env.NODE_ENV === 'production') {
  await onStop();
  // }
});

app
  .whenReady()
  .then(() => {
    console.log('app.whenReady()');
    let mainWindow = initWindow();
    console.log('initWindow() done');
    windowService.setMainWindow(mainWindow);
    console.log('initWsetMainWindowindow() done');
    OnStart.getInstance();
    mainWindow.loadURL(resolveHtmlPath('index.html'));
    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });

    app.commandLine.appendSwitch('disable-crash-reporter');
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) {
        mainWindow = initWindow();
        windowService.setMainWindow(mainWindow);
      }
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
    windowService.getMainWindow().on('ready-to-show', () => {
      if (!windowService.getMainWindow()) {
        throw new Error('mainWindow" is not defined');
      } else {
        if (global.DEBUG) {
          windowService.getMainWindow().webContents.openDevTools();
        }
      }
    });
    windowService.getMainWindow().on('closed', () => {
      windowService.setMainWindow(null);
    });
  })
  .catch(console.log);

// const installExtensions = async () => {
//   const installer = require('electron-devtools-installer');
//   const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
//   const extensions = ['REACT_DEVELOPER_TOOLS'];

//   return installer
//     .default(
//       extensions.map((name) => installer[name]),
//       forceDownload,
//     )
//     .catch(console.log);
// };
// if (process.env.NODE_ENV === 'production') {
//   const sourceMapSupport = require('source-map-support');
//   sourceMapSupport.install();
// }
