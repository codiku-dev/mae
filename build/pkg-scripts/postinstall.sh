#!/bin/sh

########### MAC INSTALLATION ONLY FOR NOW ###########
# Get the directory of the current script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Load utils and commands
. "$SCRIPT_DIR/../../src/scripts/installation/ollama-install-mac.sh"



# Create the log file in /tmp with correct permissions
LOG_FILE="/tmp/ollama-install-mac.log"

touch "$LOG_FILE"
chmod 666 "$LOG_FILE"

echo "Starting installation process at $(date)" > "$LOG_FILE"

# Create a temporary shell script to run in Terminal
TEMP_SHELL_SCRIPT="/tmp/ollama_install_log.sh"

cat << EOF > "$TEMP_SHELL_SCRIPT"
#!/bin/bash
tail -f "$LOG_FILE" &
TAIL_PID=\$!
while ! grep -q 'Installation complete' "$LOG_FILE"; do
    sleep 1
done
kill \$TAIL_PID
echo "Installation complete. This window will close in 3 seconds..."
sleep 3
osascript -e 'tell application "Terminal" to close (every window whose name contains "ollama_install_log.sh")' &
exit
EOF

chmod +x "$TEMP_SHELL_SCRIPT"

# Create a temporary AppleScript file to open Terminal and run the shell script
APPLESCRIPT_FILE="/tmp/ollama_display_log.scpt"

cat << EOF > "$APPLESCRIPT_FILE"
tell application "Terminal"
    do script "\"$TEMP_SHELL_SCRIPT\""
    activate
end tell
EOF

# Run the AppleScript to display the log in the background
osascript "$APPLESCRIPT_FILE" &

# # Run the installOllama function and log its output
installOllama >> "$LOG_FILE" 2>&1

# Clean up
rm "$APPLESCRIPT_FILE"
rm "$TEMP_SHELL_SCRIPT"

exit 0