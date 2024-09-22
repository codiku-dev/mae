import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logToMain(data: any) {
  window.electron.ipcRenderer.sendMessage('log', JSON.stringify(data));
}

export function makeInteractiveClassClickable() {
  window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', true, {
    forward: true,
  });

  const mouseEnterHandler = () => {
    window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', false);
  };
  const mouseLeaveHandler = () => {
    window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', true, {
      forward: true,
    });
  };
  const mouseMoveHandler = () => {
    const interactiveElements = document.querySelectorAll('.interactive');
    interactiveElements.forEach((element) => {
      if (!element.hasAttribute('data-listeners-added')) {
        element.addEventListener('mouseenter', mouseEnterHandler);

        element.addEventListener('mouseleave', mouseLeaveHandler);

        element.setAttribute('data-listeners-added', 'true');
      }
    });
  };
  window.addEventListener('mousemove', mouseMoveHandler);

  function unsubscribe() {
    window.removeEventListener('mousemove', mouseMoveHandler);
    window.removeEventListener('mouseenter', mouseEnterHandler);
    window.removeEventListener('mouseleave', mouseLeaveHandler);
  }
  return unsubscribe;
}

export function normalizeUrl(url: string) {
  // Remove the protocol (http, https) and normalize by lowercasing and removing trailing slashes
  return url
    .replace(/^(https?:\/\/)?(www\.)?/, '') // Remove protocol and 'www'
    .replace(/\/$/, '') // Remove trailing slash
    .toLowerCase(); // Make it lowercase for comparison
}

export function areUrlsEqual(url1: string, url2: string) {
  return normalizeUrl(url1) === normalizeUrl(url2);
}

export function formatKbSize(kb: number): string {
  if (kb < 1) return `${(kb * 1024).toFixed(0)}B`;
  if (kb < 1024) return `${kb.toFixed(0)}KB`;
  if (kb < 1024 * 1024) return `${(kb / 1024).toFixed(2)}MB`;
  return `${(kb / (1024 * 1024)).toFixed(2)}GB`;
}

export function isValidUrl(url: string) {
  const urlPattern =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return urlPattern.test(url);
}

export function addProtocolToUrl(url: string) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url;
}
