#!/bin/sh

# Function to check if OLLama is installed
checkForOLLama() {
  if ! isOllamaInstalled; then
    echo "Ollama is not installed"
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
# Main installation function
installOllama() {
  checkForOLLama

  # Function to create symlink with admin privileges
  # Call the function to create the symlink
  createSymlink
  addFirstRunDoneMetadata
  startOllama
  pullOllamaModel "llama3.1"
  echo "Building custom model llama3.1:mia... located in $SCRIPT_DIR/Modelfile"

  /usr/local/bin/ollama create llama3.1:mia -f "$SCRIPT_DIR/Modelfile"
  if [ $? -eq 0 ]; then
    echo "Mia: Custom model llama3.1:mia built successfully."
  else
    echo "Mia: Failed to build custom model llama3.1:mia."
  fi
  stopOllama
}

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
. "$SCRIPT_DIR/ollama-commands.sh"  #

# Run the installation
installOllama