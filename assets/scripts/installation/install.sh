#!/bin/sh

########### MAC INSTALLATION ONLY FOR NOW ###########
# Get the directory of the current script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Load utils and commands
. "$SCRIPT_DIR/ollama-install-mac.sh"


installOllama


echo "POST INSTALL SCRIPT FINISHED"
exit 0