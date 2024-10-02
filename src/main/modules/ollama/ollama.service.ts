import { exec } from 'child_process';
import { promises as fsPromises } from 'fs';
import { promisify } from 'util';
import { sleep } from '../../../libs/utils';

const execAsync = promisify(exec);

const BASE_LOCAL_BIN_PATH = '/usr/local/bin';
const BASE_BIN_PATH = '/usr/bin';
const BASE_SBIN_PATH = '/usr/sbin';

export class OllamaService {
  private static instance: OllamaService;

  private constructor() {}

  public static getInstance(): OllamaService {
    if (!OllamaService.instance) {
      OllamaService.instance = new OllamaService();
    }
    return OllamaService.instance;
  }

  public async pullModel(modelName: string) {
    console.log(`Mia: Pulling ${modelName} model...`);
    try {
      const { stdout, stderr } = await execAsync(
        `${BASE_LOCAL_BIN_PATH}/ollama pull ${modelName}`,
      );
      if (stderr) {
        console.error('Command error output:', stderr);
      }
    } catch (error) {
      console.error('Error executing command:', error);
    }
  }

  public async isInstalled() {
    const ollamaPath = '/Applications/OLLama.app';
    try {
      await fsPromises.access(ollamaPath);
      return true;
    } catch {
      return false;
    }
  }

  public async start() {
    console.log('Mia: Starting OLLAMA...');

    let isRunning = await this.isRunning();

    if (!isRunning) {
      console.log('Mia: ollama serve');
      const ollamaProcess = exec(`${BASE_LOCAL_BIN_PATH}/ollama serve`);
      while (!isRunning) {
        await sleep(1000);
        isRunning = await this.isRunning();
      }
      if (isRunning) {
        console.log('Mia: OLLAMA started successfully on port 11434.');
      } else {
        console.error('Mia: OLLAMA failed to start.');
      }
      ollamaProcess.on('error', (error) => {
        console.error(`Mia: OLLAMA error: ${error}`);
      });
      ollamaProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Mia: OLLAMA process exited with code ${code}`);
        }
      });
    } else {
      console.log('Mia: OLLAMA is already running on port 11434.');
    }
  }

  public async stop() {
    console.log('Mia: Stopping OLLAMA...');
    try {
      const { stdout } = await execAsync(
        `${BASE_BIN_PATH}/pkill -9 ollama Ollama`,
      );
      if (stdout) {
        console.log('Mia: OLLAMA stopped successfully.');
      }
    } catch (error) {
      console.error('Mia: OLLAMA failed to stop. Probably already stopped.');
    }
  }

  public async isRunning() {
    console.log('Mia: Checking if OLLAMA is running...');
    try {
      const { stdout: checkStdout, stderr: checkStderr } = await execAsync(
        `${BASE_SBIN_PATH}/lsof -i :11434`,
      );
      if (checkStdout) {
        return true;
      }
      if (checkStderr) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  public async restart() {
    await this.stop();
    await this.start();
  }
}

export const ollamaService = OllamaService.getInstance();
