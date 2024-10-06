import { exec } from 'child_process';
import { promises as fsPromises } from 'fs';
import { promisify } from 'util';
import { sleep } from '../../../libs/utils';
import { OllamaConfig } from '@/renderer/services/ollama/ollama.config';
import path from 'path';
import { logToMain } from '@/renderer/libs/utils';
import { spawn } from 'child_process';

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

  public async install(): Promise<boolean> {
    console.log('BEGINING OF INSTALL FUNCTION');
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(
        __dirname,
        '..',
        '..',
        'build',
        'pkg-scripts',
        'postinstall.sh',
      );

      console.log('SPANWN');
      const child = spawn('sh', [scriptPath], {
        stdio: ['ignore', 'pipe', 'pipe'],
      });

      child.stdout.on('data', (data) => {
        console.log('Ollama installation output:', data.toString());
      });

      child.stderr.on('data', (data) => {
        console.error('Command error output:', data.toString());
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log('Ollama installation completed successfully.');
          resolve(true);
        } else {
          console.error(`Ollama installation failed with code ${code}`);
          reject(new Error(`Installation failed with code ${code}`));
        }
      });

      child.on('exit', () => {
        console.log('Ollama installation completed successfully. EXITING');
        resolve(true);
      });
    });
  }

  public async pullModel(modelName: string) {
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
    let isRunning = await this.isRunning();

    if (!isRunning) {
      const ollamaProcess = exec(`${BASE_LOCAL_BIN_PATH}/ollama serve`);
      while (!isRunning) {
        await sleep(500);
        isRunning = await this.isRunning();
      }
      if (isRunning) {
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
    }
  }

  public async stop() {
    try {
      const { stdout } = await execAsync(
        `${BASE_BIN_PATH}/pkill -9 ollama Ollama`,
      );
      if (stdout) {
      }
    } catch (error) {
      console.error('Mia: OLLAMA failed to stop. Probably already stopped.');
    }
  }

  public async isRunning() {
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

  public async preloadDefaultModel() {
    await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OllamaConfig.defaultModel + OllamaConfig.customModelSuffix,
        prompt: 'Hello',
        stream: false,
      }),
    });
  }
}

export const ollamaService = OllamaService.getInstance();
