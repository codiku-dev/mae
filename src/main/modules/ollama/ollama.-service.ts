import { exec, spawn, ChildProcess } from 'child_process';
import { promises as fsPromises } from 'fs';
import { promisify } from 'util';
import { getResourcesPath, logToRenderer, sleep } from '../../../libs/utils';
import { OllamaConfig } from '@/renderer/services/ollama/ollama.config';
import treeKill from 'tree-kill';

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

  public async install(
    onProgress: (progress: string) => void,
  ): Promise<boolean> {
    logToRenderer('BEGINNING OF INSTALL FUNCTION');

    return new Promise((resolve, reject) => {
      let scriptPath = getResourcesPath(
        '/assets/scripts/installation/install.sh',
      );
      logToRenderer(`Script path: ${scriptPath}`);

      const child: ChildProcess = spawn('sh', [scriptPath], {
        stdio: ['ignore', 'pipe', 'pipe'],
      });

      const killProcess = () => {
        if (child.pid) {
          treeKill(child.pid, 'SIGKILL', (err) => {
            if (err) {
              console.error('Failed to kill process tree:', err);
              logToRenderer(`Failed to kill process tree: ${err}`);
            } else {
              console.log('Process tree killed successfully : PID', child.pid);
              logToRenderer(
                `Process tree killed successfully : PID ${child.pid}`,
              );
            }
          });
        }
      };

      const cleanupAndResolve = (success: boolean) => {
        killProcess();
        child?.stdout?.removeAllListeners('data');
        child?.stderr?.removeAllListeners('data');
        child?.removeAllListeners('close');
        child?.removeAllListeners('exit');
        resolve(success);
      };

      child?.stdout?.on('data', async (data) => {
        console.log('Ollama installation output:', data.toString());
        onProgress(data.toString());
        if (data.toString().includes('Installation complete')) {
          cleanupAndResolve(true);
        }
      });

      child?.stderr?.on('data', (data) => {
        console.error('Command error output:', data.toString());
        logToRenderer(data.toString());
        onProgress(data.toString());
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log('Ollama installation completed successfully.');
          logToRenderer('Ollama installation completed successfully.');
          onProgress('Ollama installation completed successfully.');
          cleanupAndResolve(true);
        } else {
          console.error(`Ollama installation failed with code ${code}`);
          logToRenderer(`Ollama installation failed with code ${code}`);
          onProgress(`Ollama installation failed with code ${code}`);
          reject(new Error(`Installation failed with code ${code}`));
        }
      });

      child.on('exit', () => {
        console.log('Ollama installation. EXITING');
        logToRenderer('Ollama installation. EXITING');
        resolve(true);
        return;
      });
    });
  }

  public async pullModel(modelName: string) {
    logToRenderer(`Pulling model: ${modelName}`);
    try {
      const { stdout, stderr } = await execAsync(
        `${BASE_LOCAL_BIN_PATH}/ollama pull ${modelName}`,
      );
      if (stderr) {
        logToRenderer(stderr);
        console.error('Command error output:', stderr);
      }
    } catch (error) {
      logToRenderer((error as Error).toString());
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
        logToRenderer('Mia: OLLAMA failed to start.');
      }
      ollamaProcess.on('error', (error) => {
        console.error(`Mia: OLLAMA error: ${error}`);
        logToRenderer(`Mia: OLLAMA error: ${error}`);
      });
      ollamaProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Mia: OLLAMA process exited with code ${code}`);
          logToRenderer(`Mia: OLLAMA process exited with code ${code}`);
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
      logToRenderer('Mia: OLLAMA failed to stop. Probably already stopped.');
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

  public async warmupDefaultModel() {
    const data = await fetch('http://localhost:11434/api/generate', {
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
    const json = await data.json();
  }
}

export const ollamaService = OllamaService.getInstance();
