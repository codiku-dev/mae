import { app, BrowserWindow, shell } from 'electron';
import { username } from 'username';
import { beforeStart } from '@/scripts/before-start';
import { useSettings } from '@/renderer/hooks/use-settings';
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
    console.log('Mia: finished pre start actions');
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
      console.log('Mia: enabling auto launch');
      miaAutoLauncher.enable();
    } else {
      console.log('Mia: disabling auto launch');
      miaAutoLauncher.disable();
    }
  }

  public isAppPackaged(): boolean {
    return app.isPackaged;
  }
}

export const applicationService = ApplicationService.getInstance();
