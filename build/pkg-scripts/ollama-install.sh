#!/bin/sh

# Function to check if OLLama is installed
checkForOLLama() {
  if ! isOllamaInstalled; then
    echo "Ollama is not installed, installing..."
    downloadAndInstallOLLama
  else
    echo "Ollama is already installed, skipping Ollama installation."
  fi
}

# Function to check if OLLama is installed
isOllamaInstalled() {
  if [ -d "/Applications/OLLama.app" ]; then
    return 0
  else
    return 1
  fi
}

# Function to download and install OLLama
downloadAndInstallOLLama() {
  local redirectZipUrl="https://ollama.com/download/Ollama-darwin.zip"
  local redirectZipPath="$(dirname "$0")/Ollama-darwin-redirect.zip"
  rm -f "$redirectZipPath"
  downloadFile "$redirectZipUrl" "$redirectZipPath"
  extractZip "$redirectZipPath"
}

# Function to download a file
downloadFile() {
  local downloadUrl="$1"
  local dest="$2"
  curl -L -o "$dest" "$downloadUrl"
  if [ $? -ne 0 ]; then
    echo "Mia: Failed to download file."
    rm -f "$dest"
    exit 1
  fi
  echo "Mia: File downloaded successfully."
}

# Function to extract a zip file
extractZip() {
  local zipPath="$1"
  unzip -o "$zipPath" -d /Applications
  if [ $? -ne 0 ]; then
    echo "Mia: Error during extraction."
    exit 1
  fi
  echo "Mia: OLLama installed successfully."
  rm -f "$zipPath"
}

# Function to add first run metadata
addFirstRunDoneMetadata() {
  local configDir="$HOME/Library/Application Support/Ollama"
  local configPath="$configDir/config.json"
  
  # Create the directory if it doesn't exist
  mkdir -p "$configDir"
  
  # Create or overwrite the config file
  echo '{ "first-time-run": true }' > "$configPath"
  if [ $? -ne 0 ]; then
    echo "Mia: Error writing first run metadata."
    exit 1
  fi
  echo "Mia: First run metadata added successfully."
}

# Main installation function
installOllama() {
  checkForOLLama
  addFirstRunDoneMetadata
  startOllama
  pullOllamaModel "llama3.1"
  stopOllama
}

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "$SCRIPT_DIR/ollama-commands.sh"  #

# Run the installation
installOllama