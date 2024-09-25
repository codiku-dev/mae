import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SplashScreen } from '../components/features/splash-screen';
import { Toaster } from '../components/ui/toaster';
import { useAppStore } from '../hooks/use-app-store';
import { ROUTES } from './routes';
import { logToMain, makeInteractiveClassClickable } from './utils';
import { DevTool } from '../components/features/dev-tools';
import { useSettings } from '../hooks/use-settings';

// TODO: Add a global listener to handle the navigate event

export const AppLoader = () => {
  const navigate = useNavigate();
  const [isDebug, setIsDebug] = useState(false);
  const { setIsAppLoading, isAppLoading, setUserName } =
    useAppStore();

  const { isAppLaunchedOnStartup } = useSettings();

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('user-info-request');
    window.electron.ipcRenderer.on('user-info-reply', (username) => {
      setUserName(username);
    });
  }, []);

  const loadIsDebug = async () => {
    const isPackaged = await window.electron.ipcRenderer.invoke('is-app-packaged');
    setIsDebug(!isPackaged);
  }
  useEffect(() => {
    const unsubscribe = makeInteractiveClassClickable();
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadIsDebug();
    window.electron.ipcRenderer.sendMessage('request-before-start');
    const unsubscribeBeforeStartReply = window.electron.ipcRenderer.on(
      'before-start-reply',
      () => {
        setIsAppLoading(false);
        window.electron.ipcRenderer.sendMessage('navigate', ROUTES.home);
        loadIsDebug()
        // clearAllHistory();
        // resetStore()
      },
    );
    return () => {
      unsubscribeBeforeStartReply();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = window.electron.ipcRenderer.on(
      'navigate',
      (path: string) => {
        navigate(path);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [navigate]);



  if (isAppLoading) {
    return isAppLaunchedOnStartup || isDebug ? null : <SplashScreen />;
  }
  return (
    <>
      {isDebug && <DevTool />}
      <Toaster />
      <Outlet />
    </>
  );
};
