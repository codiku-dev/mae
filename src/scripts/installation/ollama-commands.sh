#!/bin/sh

# Function to pull OLLama model
pullOllamaModel() {
  echo "Mia: Pulling model..."
  local modelName="$1"

  echo "Mia: Pulling $modelName model..."
  if "/usr/local/bin/ollama" pull "$modelName"; then
    echo "Mia: Model pulled successfully."
    return 0
  else
    echo "Mia: Failed to pull model."
    return 1
  fi
}

# Function to start OLLama
startOllama() {
  echo "Mia: Starting OLLAMA..."
  if ! isOllamaRunning; then
    "/usr/local/bin/ollama" serve &
    
    # Wait for Ollama to start (max 30 seconds)
    for i in {1..30}; do
      if isOllamaRunning; then
        echo "Mia: OLLAMA started successfully on port 11434."
        return 0
      fi
      echo "Mia: Waiting for OLLAMA to start... (attempt $i)"
      sleep 1
    done
    
    echo "Mia: OLLAMA failed to start after 30 seconds."
    return 1
  else
    echo "Mia: OLLAMA is already running on port 11434."
  fi
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

createOllamaModelFromModelFile() {
  echo "Building custom model $1... located from model file : $2"
  /usr/local/bin/ollama create "$1" -f "$2"
  return $?
}
