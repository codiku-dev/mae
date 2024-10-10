// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'global-shortcut'
  | 'log'
  | 'request-close-window'
  | 'request-open-window'
  | 'copy-text-to-clipboard-request'
  | 'log-renderer'
  | 'user-info-request'
  | 'request-open-external-link'
  | 'before-start-reply'
  | 'navigate'
  | 'on-searchbar-visibility-change'
  | 'request-show-searchbar'
  | 'reply-show-searchbar'
  | 'make-http-request'
  | 'toggle-app-auto-launch'
  | 'sandbox-request'
  | 'add-vector-docs'
  | 'find-vector-doc'
  | 'add-doc-in-memory'
  | 'search-doc-in-memory'
  | 'delete-all-doc-in-memory'
  | 'delete-vector-doc'
  | 'delete-all-vector-doc'
  | 'is-app-packaged'
  | 'pull-ollama-model'
  | 'install-ollama'
  | 'check-ollama-installed'
  | 'install-ollama-progress';

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
    removeListener(channel: Channels, func: (...args: any[]) => void) {
      ipcRenderer.removeListener(channel, func);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
