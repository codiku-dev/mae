import { net } from 'electron';
import { logToRenderer } from '@/libs/utils';
import { windowService } from '../window/window.service';

export class HttpService {
  private static instance: HttpService;

  private constructor() {}

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  public async fetchText(
    event: Electron.IpcMainInvokeEvent,
    url: string,
  ): Promise<string> {
    logToRenderer(`Fetching: ${url}`);

    try {
      const response = await net.fetch(url);
      const text = await response.text();
      logToRenderer(`Response found for ${url}`);
      return text;
    } catch (error) {
      logToRenderer(`Error fetching ${url}: ${(error as Error).message}`);
      throw error;
    }
  }

  // Add other HTTP-related methods here as needed
}

// Export the singleton instance
export const httpService = HttpService.getInstance();
