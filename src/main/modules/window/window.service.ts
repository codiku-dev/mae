import { app, BrowserWindow /* ,screen */, screen } from 'electron';
import path from 'path';

class WindowService {
  private static instance: WindowService;
  private mainWindow: BrowserWindow | null = null;

  private constructor() {}

  public static getInstance(): WindowService {
    if (!WindowService.instance) {
      WindowService.instance = new WindowService();
    }
    return WindowService.instance;
  }

  public getMainWindow(): BrowserWindow {
    return this.mainWindow as BrowserWindow;
  }

  public focusWindow() {
    this.mainWindow?.focus();
  }

  public blurWindow() {
    this.mainWindow?.blur();
  }

  public hideWindow() {
    this.mainWindow?.hide();
  }

  public showWindow() {
    this.mainWindow?.show();
  }

  public isWindowFocused(): boolean {
    return this.mainWindow?.isFocused() ?? false;
  }

  public isWindowVisible(): boolean {
    return this.mainWindow?.isVisible() ?? false;
  }

  public setMainWindow(mainWindow: BrowserWindow | null) {
    this.mainWindow = mainWindow;
  }
}

export const windowService = WindowService.getInstance();
