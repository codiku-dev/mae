

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Load utils and commands
. "$CURRENT_DIR/utils.sh"
. "$CURRENT_DIR/ollama-commands.sh"

# Function to check if OLLama is installed
checkForOLLama() {
  if ! isOllamaInstalled; then
    echo "Ollama is not installed"
    return 1
  else
    echo "Ollama is already installed, skipping Ollama installation."
    return 0
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
downloadAndInstallOLLamaMacVersion() {
  local redirectZipUrl="https://ollama.com/download/Ollama-darwin.zip"
  local redirectZipPath="$(dirname "$0")/Ollama-darwin-redirect.zip"
  rm -f "$redirectZipPath"
  downloadFile "$redirectZipUrl" "$redirectZipPath"
  extractOllamaZip "$redirectZipPath"
}


# Function to extract a zip file
extractOllamaZip() {
  local zipPath="$1"
  unzip -o "$zipPath" -d /Applications
  if [ $? -ne 0 ]; then
    echo "Mia: Error during extraction."
    exit 1
  fi
  echo "Mia: OLLama installed successfully."
  chmod -R 755 /Applications/OLLama.app
  rm -f "$zipPath"
}

# Function to add first run metadata
addFirstRunDoneMetadata() {
  local configDir="$HOME/Library/Application Support/Ollama"
  local configPath="$configDir/config.json"
  
  echo "Creating config directory: $configDir"
  # Create the directory if it doesn't exist
  mkdir -p "$configDir"
  # Make the directory writable by the user
  chmod 755 "$configDir"
  
  echo "Add config into: $configPath"
  # Create or overwrite the config file
  echo '{
         "first-time-run": true
}' > "$configPath"
  if [ $? -ne 0 ]; then
    echo "Mia: Error writing first run metadata."
    exit 1
  fi
  
  # Set correct permissions for the config file
  chmod 644 "$configPath"
  
  echo "Mia: First run metadata added successfully."
}

# Function to create symlink with admin privileges
createSymlink() {
  local ollama="/Applications/Ollama.app/Contents/Resources/ollama"
    local symlinkPath="/usr/local/bin/ollama"
    # Create the symlink using osascript to gain admin privileges
    osascript <<EOF
do shell script "mkdir -p $(dirname "$symlinkPath") && ln -F -s '$ollama' '$symlinkPath'" with administrator privileges
EOF

    if [ $? -eq 0 ]; then
      echo "Mia: Symlink created successfully."
    else
      echo "Mia: Failed to create symlink."
      exit 1
    fi
  }

 setRightsForModelFolder() {
  echo "Setting rights for model folder"
  # Use osascript to run the chmod command with admin privileges
  osascript <<EOF
    do shell script "chmod -R 777 '$HOME/.ollama'" with administrator privileges
EOF
  if [ $? -eq 0 ]; then
    echo "Rights set for model folder"
  else
    echo "Failed to set rights for model folder"
    exit 1
  fi
}

# Main installation function
installOllama() {
  echo "Checking for Ollama"
  checkForOLLama
  if [ $? -eq 1 ]; then
    echo "Downloading and installing Ollama"
    downloadAndInstallOLLamaMacVersion
  else
    echo "Ollama is already installed"
  fi
  
  echo
  setRightsForModelFolder
  createSymlink
  echo "Starting Ollama"
  startOllama
  echo "Ollama started"
  
  echo "Pulling model"
  if pullOllamaModel "llama3.2:1b"; then
    createOllamaModelFromModelFile "llama3.2:1b-mia" "$SCRIPT_DIR/initial-modelfile-llama3.2:1b"
    if pullOllamaModel "mxbai-embed-large:latest"; then
     if [ $? -eq 0 ]; then
      echo "Mia: Custom model mxbai-embed-large-mia built successfully."
     else
      echo "Mia: Failed to build custom model mxbai-embed-large-mia."
    fi
    fi
  fi
  echo "Models pulled and built"
  
  # stopOllama
  # Print 20 empty lines using a loop
  for i in $(seq 1 20); do
    echo ""
  done
  
  echo "Installation complete, you can close this window now"
  exit 0
}


