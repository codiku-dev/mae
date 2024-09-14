'use client';

import { LanguageCode, LANGUAGES } from '@/libs/languages';
import { Button } from '@/renderer/components/ui/button';
import { Checkbox } from '@/renderer/components/ui/checkbox';
import { useToast } from '@/renderer/hooks/use-toast';
import React, { useEffect, useState } from 'react';

import { ModelFile } from '@/main/services/ollama/Modelfile';
import {
  ollamaService,
  OllamaService,
} from '@/main/services/ollama/ollama.service';
import { Loader2, Trash, X } from 'lucide-react';
import { LanguageSelection } from '../components/features/settings/language-selection';
import { ROUTES } from '../libs/routes';
import { HistorySection } from '../components/features/settings/history-section';
import { StartupSection } from '../components/features/settings/startup-section';
import { useAppStore } from '../hooks/use-app-store';

type FormValues = {
  assistantLanguage: LanguageCode;
  isAppLaunchedOnStartup: boolean;
};
export interface Model {
  id: string;
  name: string;
  isActive: boolean;
}
export function SettingsPage() {
  const appStore = useAppStore();
  const {
    isAppLaunchedOnStartup,
    assistantLanguage,
    setIsAppLaunchedOnStartup,
  } = appStore;
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    isAppLaunchedOnStartup: isAppLaunchedOnStartup,
    assistantLanguage,
  });

  const { toast } = useToast();

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('request-open-window');
    window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', false, {
      forward: true,
    });
  }, []);

  const hasFieldChanged = (
    field: keyof Pick<
      FormValues,
      'assistantLanguage' | 'isAppLaunchedOnStartup'
    >,
  ) => {
    return appStore[field] !== formValues[field];
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(
      'has field changed ? ',
      hasFieldChanged('isAppLaunchedOnStartup'),
    );
    if (hasFieldChanged('isAppLaunchedOnStartup')) {
      setIsAppLaunchedOnStartup(formValues.isAppLaunchedOnStartup);
      window.electron.ipcRenderer.invoke(
        'set-app-auto-launch',
        formValues.isAppLaunchedOnStartup,
      );
    }

    if (hasFieldChanged('assistantLanguage')) {
      const modelFile = new ModelFile();
      appStore.setAssistantLanguage(formValues.assistantLanguage);
      modelFile.addRule(
        `You will answer the user exclusively with the following language: ${LANGUAGES[formValues.assistantLanguage || 'en'].name}. Even if the user is speaking another language than the one you are answering in, you will answer in the language you are speaking in.`,
      );
      try {
        await ollamaService.createOllamaModelFromModelFile(modelFile);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to set new language',
        });
        return;
      }
    }

    toast({
      title: 'Settings saved',
      description: 'Your changes have been successfully applied.',
    });
    setIsLoading(false);
  };

  const closeButton = (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className=""
      onClick={() => {
        window.electron.ipcRenderer.sendMessage('navigate', ROUTES.home);
      }}
    >
      <X className="h-6 w-6" />
    </Button>
  );

  const handleLaunchOnStartupChange = (checked: boolean) => {
    setFormValues({
      ...formValues,
      isAppLaunchedOnStartup: checked,
    });
  };

  const lancheOnStartCheckbox = (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="isLaunchedOnStartup"
        name="isLaunchedOnStartup"
        checked={formValues.isAppLaunchedOnStartup}
        onCheckedChange={(checked) =>
          setFormValues({
            ...formValues,
            isAppLaunchedOnStartup: checked as boolean,
          })
        }
      />
      <label
        htmlFor="isLaunchedOnStartup"
        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Launch on startup
      </label>
    </div>
  );

  return (
    <form
      className="h-screen w-screen p-4 space-y-6 bg-white relative"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">MIA Settings</h1>
        {closeButton}
      </div>

      <LanguageSelection
        currentLanguage={formValues.assistantLanguage || 'en'}
        onChange={(language) => {
          setFormValues({ ...formValues, assistantLanguage: language });
        }}
      />

      <StartupSection
        isLaunchedOnStartup={formValues.isAppLaunchedOnStartup || false}
        onLaunchOnStartupChange={handleLaunchOnStartupChange}
      />

      <HistorySection />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Applying...
          </>
        ) : (
          'Apply'
        )}
      </Button>
    </form>
  );
}
