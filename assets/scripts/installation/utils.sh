# Function to download a file
downloadFile() {
  local downloadUrl="$1"
  local dest="$2"
  curl -L -o "$dest" "$downloadUrl"
  if [ $? -ne 0 ]; then
    echo "Failed to download file."
    rm -f "$dest"
    exit 1
  fi
  echo "File downloaded successfully."
}
