import { app, BrowserWindow /* ,screen */, screen } from 'electron';
import path from 'path';
import { start } from './start';
import { on } from 'events';

export function initWindow() {
  // const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  global.DEBUG = !app.isPackaged;
  let mainWindow: BrowserWindow | null = new BrowserWindow({
    height: screen.getPrimaryDisplay().workAreaSize.height,
    width: screen.getPrimaryDisplay().workAreaSize.width,
    x: 0,
    y: 0,
    frame: global.DEBUG,
    transparent: global.DEBUG ? false : true,
    movable: global.DEBUG,
    hasShadow: false,
    show: true,
    visualEffectState: 'inactive',
    resizable: global.DEBUG,
    focusable: false,
    alwaysOnTop: !global.DEBUG,

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

  //open dev tools

  app.commandLine.appendSwitch('disable-crash-reporter');

  if (!global.DEBUG) {
    mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  }
  // mainWindow.setIgnoreMouseEvents(true);
  global.ignoreMouseEvent = global.DEBUG ? false : true;
  // mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);
  start(app, mainWindow);
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('mainWindow" is not defined');
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  return mainWindow;
}
