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
