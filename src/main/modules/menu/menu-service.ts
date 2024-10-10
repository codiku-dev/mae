import { getResourcesPath } from '@/libs/utils';
import { ROUTES } from '@/routes';
import { app, ipcMain, Menu, nativeImage, Tray } from 'electron';
import { windowService } from '../window/window.service';
import { shortcutService } from '../shortcuts/shortcut-service';
import { navigatorService } from '../navigator/navigator-service';

export class MenuService {
  private static instance: MenuService;
  private tray: Tray | null = null;
  private contextMenu: Menu | null = null;
  private iconUpdateInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): MenuService {
    if (!MenuService.instance) {
      MenuService.instance = new MenuService();
    }
    return MenuService.instance;
  }

  public initMenu() {
    const icon = nativeImage.createFromPath(
      getResourcesPath('/assets/icons/16x16.png'),
    );
    this.tray = new Tray(icon);
    const template = [
      {
        label: 'Open Mia (⌘+⇧+p)',
        click: () => this.handleOpenCloseAiChat(),
        commandId: 1, // Replace with actual MENU.OPEN_CLOSE.id
      },
      {
        label: 'Settings',
        click: () => this.handleSettings(),
        commandId: 2, // Replace with actual MENU.SETTINGS.id
      },
      {
        label: 'Quit',
        click: () => app.quit(),
        commandId: 3, // Replace with actual MENU.QUIT.id
      },
    ];
    this.setContextMenu(template);
  }

  public setContextMenu(template: Electron.MenuItemConstructorOptions[]) {
    this.contextMenu = Menu.buildFromTemplate(template);
    this.tray?.setContextMenu(this.contextMenu);
  }

  public updateMenuLabel(commandId: number, newLabel: string) {
    const menuItem = this.contextMenu?.items.find(
      (item) => item.commandId === commandId,
    );
    if (menuItem) {
      menuItem.label = newLabel;
      this.contextMenu = Menu.buildFromTemplate(this.contextMenu!.items);
      this.tray?.setContextMenu(this.contextMenu);
    }
  }

  public refreshMenuLabels() {
    this.updateMenuLabel(
      1, // Replace with actual MENU.OPEN_CLOSE.id
      global.isSearchOpen ? 'Close Mia (⌘+⇧+p)' : 'Open Mia (⌘+⇧+p)',
    );
  }

  public setTrayIcon(iconPath: string) {
    const icon = nativeImage.createFromPath(iconPath);
    this.tray?.setImage(icon);
  }

  public startIconWarningUpdate() {
    let isWarning = false;
    this.iconUpdateInterval = setInterval(() => {
      const iconPath = isWarning
        ? getResourcesPath('/assets/icons/16x16-warning.png')
        : getResourcesPath('/assets/icons/16x16.png');
      this.setTrayIcon(iconPath);
      isWarning = !isWarning;
    }, 800);
  }

  public stopIconWarningUpdate() {
    if (this.iconUpdateInterval) {
      clearInterval(this.iconUpdateInterval);
      this.iconUpdateInterval = null;
    }
    this.setTrayIcon(getResourcesPath('/assets/icons/16x16.png'));
  }

  private handleOpenCloseAiChat() {
    console.log('handleOpenCloseAiChat ', 'currnet global', global.path);
    if (global.path !== ROUTES.home) {
      console.log('NOW GO HOME');
      navigatorService.navigate(ROUTES.home);
    }
    setTimeout(() => {
      shortcutService.emitShortCut('CommandOrControl+Shift+P');
    }, 500);
  }

  private handleSettings() {
    ipcMain.emit('navigate', ROUTES.settings);
    windowService.getMainWindow().show();
    setTimeout(() => {
      this.refreshMenuLabels();
    }, 100);
  }

  public getTray(): Tray | null {
    return this.tray;
  }

  public getContextMenu(): Menu | null {
    return this.contextMenu;
  }
}

export const menuService = MenuService.getInstance();
