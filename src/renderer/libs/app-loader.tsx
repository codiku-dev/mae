import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SplashScreen } from '../components/features/splash-screen';
import { useAppStore } from '../hooks/use-app-store';
import { logToMain, makeInteractiveClassClickable } from './utils';
// TODO: Add a global listener to handle the navigate event

export const AppLoader = () => {
  const navigate = useNavigate();
  const { setIsAppLoading, isAppLoading } = useAppStore();

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('request-before-start');
    const unsubscribeBeforeStartReply = window.electron.ipcRenderer.on(
      'before-start-reply',
      () => {
        setIsAppLoading(false);
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
        logToMain('navigate to ' + path);
        navigate(path);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = makeInteractiveClassClickable();
    return () => unsubscribe();
  }, []);

  if (isAppLoading) {
    return <SplashScreen />;
  }
  return <Outlet />;
};
