#!/bin/sh

# Determine the directory of the script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Create the log file in /tmp with correct permissions
LOG_FILE="/tmp/ollama-install.log"
touch "$LOG_FILE"
chmod 666 "$LOG_FILE"

echo "Starting installation process at $(date)" >> "$LOG_FILE"

# Create a temporary AppleScript file to open Terminal and display the log
APPLESCRIPT_FILE="/tmp/ollama_display_log.scpt"
cat << EOF > "$APPLESCRIPT_FILE"
tell application "Terminal"
    if not (exists window 1) then
        do script ""
    end if
    do script "tail -f \"$LOG_FILE\"; echo ''; echo 'Installation complete. You can close this window now...'; exit" in window 1
    activate
end tell
EOF

# Run the AppleScript to display the log in the background
osascript "$APPLESCRIPT_FILE" &

echo "Starting ollama-install.sh at $(date)" >> "$LOG_FILE"
# Run the installation script and log its output
"$SCRIPT_DIR/ollama-install.sh" >> "$LOG_FILE" 2>&1

# Clean up
rm "$APPLESCRIPT_FILE"
exit 0