import { app, BrowserWindow /* ,screen */, screen } from 'electron';
import path from 'path';
import { start } from './start';

export function initWindow() {
  // const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const DEBUG = false;

  let mainWindow = new BrowserWindow({
    height: screen.getPrimaryDisplay().workAreaSize.height,
    width: screen.getPrimaryDisplay().workAreaSize.width,
    x: 0,
    y: 0,
    frame: DEBUG ? true : false,
    transparent: DEBUG ? false : true,
    movable: DEBUG ? true : false,
    hasShadow: false,
    show: false,
    visualEffectState: 'inactive',
    alwaysOnTop: true,
    focusable: false,
    webPreferences: {
      // devTools: false,
      devTools: DEBUG,
      nodeIntegration: true,
      contextIsolation: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  //open dev tools

  app.commandLine.appendSwitch('disable-crash-reporter');

  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  // mainWindow.setIgnoreMouseEvents(true);
  global.ignoreMouseEvent = true;
  // mainWindow.setAlwaysOnTop(true, 'screen-saver', 1);

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('mainWindow" is not defined');
    }

    start(mainWindow);
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  return mainWindow;
}
