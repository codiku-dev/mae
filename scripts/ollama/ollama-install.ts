import { exec } from 'child_process';
import fs, { promises as fsPromises } from 'fs';
import https from 'https';
import path from 'path';
import { promisify } from 'util';
import { pullOllamaModel } from '../ollama/ollama.commands';

const execAsync = promisify(exec);
export async function installOllama() {
  await checkForOLLama();
  await addFirstRunDoneMetadata();
  await pullOllamaModel('llama3.1');
}

async function checkForOLLama() {
  console.log('Mia : Checking for OLLama...');
  const ollamaPath = '/Applications/OLLama.app';
  try {
    await fsPromises.access(ollamaPath);
    console.log('OLLama is already installed.');
  } catch {
    console.log('Mia : OLLama is not installed. Downloading and installing...');
    await downloadAndInstallOLLama();
  }
}

async function downloadAndInstallOLLama() {
  const redirectZipUrl = 'https://ollama.com/download/Ollama-darwin.zip';
  const redirectZipPath = path.join(__dirname, 'Ollama-darwin-redirect.zip');
  try {
    await fsPromises.unlink(redirectZipPath);
  } catch {
    console.log('Redirect zip already deleted.');
  }
  await downloadFile(redirectZipUrl, redirectZipPath);
  await extractZip(redirectZipPath);
}

async function downloadFile(downloadUrl: string, dest: string) {
  const fileHandle = await fsPromises.open(dest, 'w');
  return new Promise((resolve, reject) => {
    const request = https.get(downloadUrl, (response: any) => {
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        // Handle redirection by recursively calling downloadFile with the new URL
        const newUrl = new URL(response.headers.location, downloadUrl).href;
        downloadFile(newUrl, dest).then(resolve).catch(reject);
      } else if (response.statusCode === 200) {
        console.log('Mia : Downloading file...\n');
        const fileStream = fs.createWriteStream(dest);
        response.pipe(fileStream);
        fileStream.on('finish', async () => {
          console.log('Mia : File downloaded successfully.\n');
          await fileHandle.close(); // Explicitly close the file handle
          fileStream.close(resolve);
        });
        fileStream.on('error', async (err: any) => {
          console.error('Mia : Error writing to file:', err);
          await fsPromises.unlink(dest);
          await fileHandle.close(); // Explicitly close the file handle
          reject(err);
        });
      } else {
        console.log('Mia : Failed to download file.\n');
        fsPromises.unlink(dest);
        reject(
          new Error(
            `Mia : Failed to download file. Status code: ${response.statusCode}`,
          ),
        );
      }
    });

    request.on('error', async (err: any) => {
      await fsPromises.unlink(dest);
      await fileHandle.close(); // Explicitly close the file handle
      reject(err);
    });
  });
}

async function extractZip(zipPath: string) {
  try {
    await execAsync(`unzip -o ${zipPath} -d /Applications`);
    console.log('Mia : OLLama installed successfully.\n');
  } catch (err) {
    console.error('Mia : Error during extraction:', err);
  } finally {
    await fsPromises.unlink(zipPath);
  }
}

// Prevent ollama from opening the welcome popup when pulling the first time ever
// We just add a json file in ollama config that tell it if it's the first run

// on my mac it's /Users/codiku/Library/Application Support/Ollama/config.json
//  you should write {
//     "first-time-run": true
// }
async function addFirstRunDoneMetadata() {
  const configPath = path.join(
    process.env.HOME || '',
    'Library',
    'Application Support',
    'Ollama',
    'config.json',
  );

  const configData = {
    'first-time-run': true,
  };

  try {
    await fsPromises.mkdir(path.dirname(configPath), { recursive: true });
    await fsPromises.writeFile(configPath, JSON.stringify(configData, null, 2));
    console.log('Mia : First run metadata added successfully.\n');
  } catch (err) {
    console.error('Mia : Error writing first run metadata:', err);
  }
}
