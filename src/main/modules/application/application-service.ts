import { useSettings } from '@/renderer/hooks/use-settings';
import { beforeStart } from '@/scripts/before-start';
import { app, BrowserWindow, shell } from 'electron';
import { username } from 'username';
var AutoLaunch = require('auto-launch');

export class ApplicationService {
  private static instance: ApplicationService;
  public static mainWindow: BrowserWindow | null = null;

  private constructor() {}

  public static getInstance(): ApplicationService {
    if (!ApplicationService.instance) {
      ApplicationService.instance = new ApplicationService();
    }
    return ApplicationService.instance;
  }

  public async runBeforeStart(): Promise<void> {
    await beforeStart();
  }

  public async getUserInfo(): Promise<string> {
    return (await username()) || '';
  }

  public openExternalLink(link: string): void {
    shell.openExternal(link);
  }

  public setAppAutoLaunch(): void {
    const miaAutoLauncher = new AutoLaunch({
      name: 'Mia',
      path: '/Applications/Mia.app',
    });
    if (useSettings.getState().isAppLaunchedOnStartup) {
      miaAutoLauncher.enable();
    } else {
      miaAutoLauncher.disable();
    }
  }

  public isAppPackaged(): boolean {
    return app.isPackaged;
  }
}

export const applicationService = ApplicationService.getInstance();
