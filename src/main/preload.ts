// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { StoreType } from './store';

export type Channels =
  | 'global-shortcut'
  | 'log'
  | 'request-close-window'
  | 'request-open-window'
  | 'set-ignore-mouse-events'
  | 'request-focus-window'
  | 'on-main-window-blur'
  | 'copy-text-to-clipboard-request'
  | 'log-renderer'
  | 'request-blur-window'
  | 'user-info-request'
  | 'user-info-reply'
  | 'request-open-external-link'
  | 'request-before-start'
  | 'before-start-reply'
  | 'navigate'
  | 'electron-store-set'
  | 'electron-store-get'
  | 'electron-store-changed'
  | 'on-searchbar-visibilty-change'
  | 'ollama-create-model'
  | 'make-http-request'
  | 'electron-store-clear'
  | 'update-launch-on-startup';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: any[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: any[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: any[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: any[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: Channels, ...args: any[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
  store: {
    get<T extends keyof StoreType>(key: T): StoreType[T] {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property: string, val: any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    getAll(): string {
      return ipcRenderer.sendSync('electron-store-get-all');
    },
    // Other method you want to add like has(), reset(), etc.
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
