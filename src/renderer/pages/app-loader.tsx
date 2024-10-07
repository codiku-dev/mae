import { ollamaService } from '@/renderer/services/ollama/ollama.service';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { DevTool } from '@/renderer/features/app-startup/dev-tools';
import { SplashScreen } from '@/renderer/features/app-startup/splash-screen';
import { Toaster } from '@/renderer/ui/toaster';
import { TooltipProvider } from '@/renderer/ui/tooltip';
import { useAppStore } from '@/renderer/hooks/use-app-store';
import { useSettings } from '@/renderer/hooks/use-settings';
import { InstallOllamaDialog } from '@/renderer/features/installation/install-ollama-dialog';
import { toast } from '@/renderer/hooks/use-toast';

export const AppLoader = () => {
  const navigate = useNavigate();
  const [isDebug, setIsDebug] = useState(false);
  const { setIsAppLoading, isAppLoading, setUserName } = useAppStore();

  const { isAppLaunchedOnStartup, setAvailableModels, availableModels } =
    useSettings();

  const [isOllamaInstalled, setIsOllamaInstalled] = useState<boolean | null>(null);

  useEffect(() => {
    beginInstallation()
  }, []);

  const beginInstallation = async () => {
    loadUserInfo();
    loadIsDebug();

    await checkOllamaInstallation()
  }

  async function loadUserInfo() {
    const userName = await window.electron.ipcRenderer.invoke('user-info-request');
    setUserName(userName);
  }

  async function loadIsDebug() {
    const isPackaged = await window.electron.ipcRenderer.invoke('is-app-packaged');
    setIsDebug(!isPackaged);
  }


  const checkOllamaInstallation = async () => {
    try {
      const installed = await window.electron.ipcRenderer.invoke('check-ollama-installed');
      setIsAppLoading(false)
      if (!installed) {
        window.electron.ipcRenderer.invoke("request-open-window");
        setIsOllamaInstalled(false);
      } else {
        setIsOllamaInstalled(true);
        await finishInstallation()
      }
    } catch (error) {
      console.error('Error checking Ollama installation:', error);
      toast({
        title: "Ollama verification error",
        description: "Unable to verify Ollama installation. Please try again.",
        variant: 'destructive',
      });
    }
  };

  const finishInstallation = async () => {
    setIsOllamaInstalled(true);
    await loadInstalledModels();
    window.electron.ipcRenderer.sendMessage('navigate', ROUTES.home);
  };


  async function loadInstalledModels() {
    const ollamaInstalledModels = await ollamaService.listOllamaInstalledModels();
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
  }

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

  if (isAppLoading || isOllamaInstalled === null) {
    return isAppLaunchedOnStartup || isDebug ? null : <SplashScreen />;
  }

  return (
    <>
      {isDebug && <DevTool />}
      <Toaster />
      <TooltipProvider delayDuration={100}>
        {!isOllamaInstalled ? <InstallOllamaDialog onInstallationComplete={finishInstallation} /> :
          <Outlet />
        }
      </TooltipProvider>

    </>
  );
};