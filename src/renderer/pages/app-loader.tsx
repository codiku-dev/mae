import { ollamaService } from '@/renderer/services/ollama/ollama.service';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { DevTool } from '../components/features/dev-tools';
import { SplashScreen } from '../components/features/splash-screen';
import { Toaster } from '../components/ui/toaster';
import { TooltipProvider } from '../components/ui/tooltip';
import { useAppStore } from '../hooks/use-app-store';
import { useSettings } from '../hooks/use-settings';
import { logToMain } from '../libs/utils';

// TODO: Add a global listener to handle the navigate event

export const AppLoader = () => {
  const navigate = useNavigate();
  const [isDebug, setIsDebug] = useState(false);
  const { setIsAppLoading, isAppLoading, setUserName } = useAppStore();

  const { isAppLaunchedOnStartup, setAvailableModels, availableModels } =
    useSettings();

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('user-info-request');
    window.electron.ipcRenderer.on('user-info-reply', (username) => {
      setUserName(username);
    });
  }, []);

  const loadIsDebug = async () => {
    const isPackaged =
      await window.electron.ipcRenderer.invoke('is-app-packaged');
    setIsDebug(!isPackaged);
  };

  function loadInstalledModels() {
    ollamaService.listOllamaInstalledModels().then((ollamaInstalledModels) => {
      const installedModelsIds = ollamaInstalledModels.map(
        (model) => model.model,
      );
      const newAvailableModels = availableModels.map((model) => {
        return {
          ...model,
          isInstalled: installedModelsIds.includes(model.id),
        };
      });
      setAvailableModels(newAvailableModels);
    });
  }

  useEffect(() => {
    loadIsDebug();
    logToMain('Mia: request-before-start');
    window.electron.ipcRenderer.sendMessage('request-before-start');
    const unsubscribeBeforeStartReply = window.electron.ipcRenderer.on(
      'before-start-reply',
      () => {
        loadInstalledModels();
        setIsAppLoading(false);
        window.electron.ipcRenderer.sendMessage('navigate', ROUTES.home);
        loadIsDebug();
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
      <TooltipProvider delayDuration={100}>
        <Outlet />
      </TooltipProvider>
    </>
  );
};
