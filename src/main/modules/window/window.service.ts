import { logToMain } from '@/renderer/libs/utils';
import { BrowserWindow } from 'electron';

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

  public toggleOpenWithAnimation(shouldOpen: boolean) {
    if (this.mainWindow) {
      // Check if the window is already in the desired state
      if (
        (shouldOpen && this.mainWindow.isVisible()) ||
        (!shouldOpen && !this.mainWindow.isVisible())
      ) {
        return; // Do nothing if the window is already in the desired state
      }

      const openAnimationDuration = 400;
      const closeAnimationDuration = 400;
      const steps = 20;
      const animationDuration = shouldOpen
        ? openAnimationDuration
        : closeAnimationDuration;
      const stepDuration = animationDuration / steps;
      let currentOpacity = shouldOpen ? 0 : 1;

      if (shouldOpen) {
        this.mainWindow.setOpacity(0);
        this.showWindow();
      }

      const fadeInterval = setInterval(() => {
        if (
          (shouldOpen && currentOpacity >= 1) ||
          (!shouldOpen && currentOpacity <= 0)
        ) {
          clearInterval(fadeInterval);
          if (!shouldOpen) {
            this.hideWindow();
          }
        } else {
          currentOpacity += shouldOpen ? 1 / steps : -1 / steps;
          this.mainWindow?.setOpacity(Math.max(0, Math.min(1, currentOpacity)));
        }
      }, stepDuration);
    }
  }

  public setMainWindow(mainWindow: BrowserWindow | null) {
    this.mainWindow = mainWindow;
  }
}

export const windowService = WindowService.getInstance();
