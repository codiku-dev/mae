import { app, BrowserWindow /* ,screen */, screen } from 'electron';
import path from 'path';
import { start } from './start';

export function initWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  // global.DEBUG = !app.isPackaged;
  global.canInspectCode = true;
  global.DEBUG = true;
  let mainWindow: BrowserWindow | null = new BrowserWindow({
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

  //open dev tools

  app.commandLine.appendSwitch('disable-crash-reporter');

  // if (!global.DEBUG) {
  //   mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  // }
  // mainWindow.setIgnoreMouseEvents(false);

  // global.ignoreMouseEvent = global.canInspectCode ? false : true;
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
