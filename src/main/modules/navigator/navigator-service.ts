import { ROUTES } from '@/routes';
import { windowService } from '../window/window.service';

export class NavigatorService {
  private static instance: NavigatorService;

  private constructor() {}

  public static getInstance(): NavigatorService {
    if (!NavigatorService.instance) {
      NavigatorService.instance = new NavigatorService();
    }
    return NavigatorService.instance;
  }

  public navigate(pathValue: string): void {
    if (pathValue !== ROUTES.home) {
      global.isSearchOpen = false;
    }
    global.path = pathValue;
    windowService.getMainWindow().webContents.send('navigate', pathValue);
  }

  // Add other navigation-related methods here as needed
}

// Export the singleton instance
export const navigatorService = NavigatorService.getInstance();
