import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logToMain(data: any) {
  window.electron.ipcRenderer.sendMessage('log', JSON.stringify(data));
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

export function formatTimeAgo(isoDateString: string): string {
  const date = new Date(isoDateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}
