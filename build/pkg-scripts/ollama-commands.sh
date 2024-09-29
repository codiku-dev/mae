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
  echo "Mia: Pulling model..."
  local modelName="$1"
 
  echo "Mia: Pulling $modelName model..."
  "/usr/local/bin/ollama" pull "$modelName" 
  echo "Mia: Model pulled successfully."
}

# Function to start OLLama
startOllama() {

  echo "Mia: Starting OLLAMA..."
  if ! isOllamaRunning; then
    "/usr/local/bin/ollama" serve &
    sleep 9
    if isOllamaRunning; then
      echo "Mia: OLLAMA started successfully on port 11434."
    else
      echo "Mia: OLLAMA failed to start."
    fi
  else
    echo "Mia: OLLAMA is already running on port 11434."
  fi
}

createOllamaModelFromModelFile() {
  echo "Mia: Creating model..."
  "/usr/local/bin/ollama" create llama3.1:8b-mia -f ./build/pkg-scripts/Modelfile
  echo "Mia: Model created successfully."
}
# Function to stop OLLama
stopOllama() {
  echo "Mia: Stopping OLLAMA..."
  if isOllamaRunning; then
    "/usr/bin/pkill" -9 ollama
    if [ $? -eq 0 ]; then
      echo "Mia: OLLAMA stopped successfully."
    else
      echo "Mia: OLLAMA failed to stop."
    fi
  else
    echo "Mia: No OLLAMA process found running on port 11434."
  fi
}

# Function to check if OLLama is running
isOllamaRunning() {
  /usr/sbin/lsof -i :11434 > /dev/null
  return $?
}

# Function to restart OLLama
restartOllama() {
  stopOllama
  startOllama
}

# Main execution logic
if [ $# -eq 0 ]; then
    echo "Mia: Only functions are imported , because you no command provided. Available commands: startOllama, stopOllama, restartOllama, or isOllamaRunning"
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
    createOllamaModelFromModelFile)
        createOllamaModelFromModelFile
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
        ;;
esac

