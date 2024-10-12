import { ollamaService } from '@/renderer/services/ollama/ollama.service';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { DevTool } from '@/renderer/features/app-startup/dev-tools';
import { SplashScreen } from '@/renderer/features/app-startup/splash-screen';
import { Toaster } from '@/renderer/ui/toaster';
import { TooltipProvider } from '@/renderer/ui/tooltip';
import { useAppStore } from '@/renderer/hooks/use-app-store';
import { useSettings } from '@/renderer/hooks/use-settings';
import { InstallOllamaDialog } from '@/renderer/features/installation/install-ollama-dialog';
import { toast } from '@/renderer/hooks/use-toast';
import { OllamaAPI } from '@/main/modules/ollama/ollama-api';
import { WindowAPI } from '@/main/modules/window/window-api';
import { ApplicationAPI } from '@/main/modules/application/application-api';
import { logToMain } from '../libs/utils';
import { NavigatorAPI } from '@/main/modules/navigator/navigator-api';

export const AppLoader = () => {
  const navigate = useNavigate();
  const [isDebug, setIsDebug] = useState(false);
  const { setIsAppLoading, isAppLoading, setUserName, isFirstRun, setIsFirstRun } = useAppStore();
  const { pathname } = useLocation()
  const { isAppLaunchedOnStartup, setAvailableModels, availableModels } =
    useSettings();

  const [isOllamaInstalled, setIsOllamaInstalled] = useState<boolean | null>(null);

  // Allow the main renderer menu to ask the renderer to navigate to a route
  useEffect(function listenToMainMenuNavigation() {
    const handleNavigation = (_event: Electron.IpcRendererEvent | string, route: string) => {
      const path = route || (_event as string);
      navigate(path);
    }
    const unsubscribe = NavigatorAPI.addNavigateListener(handleNavigation);
    return unsubscribe
  }, []);

  // SO the main renderer knows the route at all time ( and can update the menu accordingly )
  useEffect(function updateMainRoutePathOnRouteChange() {
    NavigatorAPI.updateRoutePath(pathname);
  }, [pathname]);

  useEffect(() => {
    beginInstallation()
  }, []);

  const beginInstallation = async () => {
    loadUserInfo();
    loadIsDebug();

    await checkOllamaInstallation()
  }

  async function loadUserInfo() {
    const userName = await ApplicationAPI.getUserInfo();
    setUserName(userName);
  }

  async function loadIsDebug() {
    const isPackaged = await ApplicationAPI.isAppPackaged();
    setIsDebug(!isPackaged);
  }


  const checkOllamaInstallation = async () => {
    logToMain("checkOllamaInstallation")
    try {
      const installed = await OllamaAPI.checkOllamaInstalled();
      setIsAppLoading(false)
      if (!installed) {
        WindowAPI.showWindow()
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
    logToMain("finishInstallation")
    OllamaAPI.warmupDefaultModel();
    await loadInstalledModels();
    setIsOllamaInstalled(true);
    if (isFirstRun) {
      navigate(ROUTES.tutorial);
    } else {
      WindowAPI.toggleWindowWithAnimation(false)
      setTimeout(() => {
        navigate(ROUTES.idle);
      }, 400)
    }

  };

  async function loadInstalledModels() {
    logToMain("loadInstalledModels")
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

  if (isAppLoading || isOllamaInstalled === null) {
    return isAppLaunchedOnStartup || isDebug ? null : <SplashScreen />;
  }


  return (
    <>
      {isDebug && <DevTool />}
      <Toaster />
      <TooltipProvider delayDuration={100}>
        {!isOllamaInstalled && <InstallOllamaDialog onInstallationComplete={finishInstallation} />}
        <Outlet />
      </TooltipProvider>

    </>
  );
};