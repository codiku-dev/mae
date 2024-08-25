import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

export async function pullOllamaModel(modelName: string) {
  console.log(`Mia : Pulling ${modelName} model...`);
  try {
    const { stdout, stderr } = await execAsync(`ollama pull ${modelName}`);
    console.log('Command output:', stdout);
    if (stderr) {
      console.error('Command error output:', stderr);
    }
  } catch (error) {
    console.error('Error executing command:', error);
  }
}

export async function startOllama() {
  console.log('Mia : Starting OLLAMA...\n');

  try {
    // Check if OLLAMA is already running on port 11434
    const { stdout } = await execAsync('lsof -i :11434').catch((error) => {
      if (error.code === 1) {
        return { stdout: '' }; // No process is using the port
      }
      throw error; // Re-throw other errors
    });

    if (stdout) {
      console.log('Mia : OLLAMA is already running on port 11434.');
    } else {
      console.log('Mia : OLLAMA is not running. Starting OLLAMA...\n');
      // Start OLLAMA on the mac
      const ollamaProcess = exec('ollama serve');

      // Poll to check if the port is in use
      const checkPort = async () => {
        while (true) {
          try {
            const { stdout: checkStdout } = await execAsync('lsof -i :11434');
            if (checkStdout) {
              console.log('Mia : OLLAMA started successfully on port 11434.');
              break;
            }
          } catch (error) {
            if ((error as any).code !== 1) {
              console.error('Mia : Error checking OLLAMA port:', error);
              break;
            }
          }
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before checking again
        }
      };

      await checkPort();

      ollamaProcess?.stderr?.on('data', (data) => {
        console.error(`Mia : OLLAMA error: ${data}`);
      });

      ollamaProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Mia : OLLAMA process exited with code ${code}`);
        }
      });
    }
  } catch (error) {
    console.error('Mia : Error checking or starting OLLAMA:', error);
  }
}

export async function stopOllama() {
  console.log('Mia : Stopping OLLAMA...\n');
  try {
    await execAsync('pkill ollama');
    console.log('Mia : OLLAMA stopped successfully.');
  } catch (error) {
    console.error('Mia : Error stopping OLLAMA:', error);
  }
}
