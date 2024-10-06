# Mia

Maé is an Electron-based project.

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Starting

To start the application, run:

### First time only

```bash
# To install ollama and the default models (that is the code run by the installer)
npm run installation
```

### Starting the application

```bash
npm start
```

This will launch the Electron app on your local machine.

## Packaging and Installer (mac only for now)

To package the application, run:

```bash
npm run package
```

Will build a pkg installer you will find in release/build/Mia-<version>-universal.pkg

The installation script is build/pkg-scripts/postinstall.sh.

It runs the ollama install script and download ollama, start ollama, pull a model, and stop ollama
