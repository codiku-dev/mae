#!/bin/sh
findOllamaPath() {
  # Source the shell profile to ensure the same environment settings
  if [ -f ~/.bash_profile ]; then
    . ~/.bash_profile
  elif [ -f ~/.bashrc ]; then
    . ~/.bashrc
  elif [ -f ~/.profile ]; then
    . ~/.profile
  fi

  export PATH=$PATH:/usr/local/bin
  echo "Mia: Checking for ollama..."
  echo "PATH IS $PATH"
  # Find the ollama path
  local ollamaPath
  ollamaPath=$(command -v ollama)
  if [ -z "$ollamaPath" ]; then
    echo "Mia: 'ollama' command not found in PATH."
  else
    echo "OLLAMA PATH IS $ollamaPath"
  fi
}

# Function to pull OLLama model
pullOllamaModel() {
  local modelName="$1"
  local ollamaPath
  ollamaPath=$(which ollama)
  if [ -z "$ollamaPath" ]; then
    echo "Mia: 'ollama' command not found. Please ensure it is installed and in your PATH."
    exit 1
  fi
  echo "Mia: Pulling $modelName model..."
  "$ollamaPath" pull "$modelName" 
  echo "Mia: Model pulled successfully."
}

# Function to start OLLama
startOllama() {
  local ollamaPath
  findOllamaPath
  ollamaPath=$(command -v ollama)
  echo "In startOllama, ollamaPath is $ollamaPath"
  if [ -z "$ollamaPath" ]; then
    echo "Mia: 'ollama' command not found. Please ensure it is installed and in your PATH."
    exit 1
  fi
  echo "Mia: Starting OLLAMA..."
  if ! isOllamaRunning; then
    "$ollamaPath" serve &
    sleep 5
    if isOllamaRunning; then
      echo "Mia: OLLAMA started successfully on port 11434."
    else
      echo "Mia: OLLAMA failed to start."
      exit 1
    fi
  else
    echo "Mia: OLLAMA is already running on port 11434."
  fi
}

# Function to stop OLLama
stopOllama() {
  local ollamaPath
  ollamaPath=$(which ollama)
  if [ -z "$ollamaPath" ]; then
    echo "Mia: 'ollama' command not found. Please ensure it is installed and in your PATH."
    exit 1
  fi
  echo "Mia: Stopping OLLAMA..."
  if isOllamaRunning; then
    pkill -9 ollama
    if [ $? -eq 0 ]; then
      echo "Mia: OLLAMA stopped successfully."
    else
      echo "Mia: OLLAMA failed to stop."
      exit 1
    fi
  else
    echo "Mia: No OLLAMA process found running on port 11434."
  fi
}

# Function to check if OLLama is running
isOllamaRunning() {
  lsof -i :11434 > /dev/null
  return $?
}

# Function to restart OLLama
restartOllama() {
  stopOllama
  startOllama
}

# Main execution logic
if [ $# -eq 0 ]; then
    echo "Mia: No command provided. Available commands: startOllama, stopOllama, restartOllama, or isOllamaRunning"
    exit 0
fi

command="$1"

case "$command" in
    startOllama)
        startOllama
        ;;
    stopOllama)
        stopOllama
        ;;
    restartOllama)
        restartOllama
        ;;
    isOllamaRunning)
        if isOllamaRunning; then
            echo "Mia: OLLAMA is running."
        else
            echo "Mia: OLLAMA is not running."
        fi
        ;;
    *)
        echo "Mia: Unknown command. Available commands: startOllama, stopOllama, restartOllama, or isOllamaRunning"
        exit 0
        ;;
esac

exit 0