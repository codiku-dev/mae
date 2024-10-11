import { menuService } from '../menu/menu-service';
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

  public navigate(route: string) {
    windowService.getMainWindow()?.webContents.send('navigate', route);
  }

  public updateRoutePath(route: string) {
    console.log(`ROUTE UPDATE : ${route}`);
    global.path = route;
    menuService.refreshMenuLabels();
  }
}

export const navigatorService = NavigatorService.getInstance();
