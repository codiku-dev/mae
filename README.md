# Maé

Maé is an Electron-based project.

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Starting

To start the application, run:

````bash
npm start
```for the project.

## Starting the Application

To start the Maé application, use the following command:

```bash
npm start
````

This will launch the Electron app on your local machine.

## Development

For development purposes, you can use:

```bash
npm run dev
```

This will start the app in development mode with hot-reloading enabled.

## Packaging and Installer

To package the application, run:

```bash
npm run package
```

Will build a pkg installer you will find in release/build/Mia-<version>.pkg

The installation script is build/pkg-scripts/postinstall.sh.

It runs the ollama install script and download ollama, start ollama, pull a model, and stop ollama
