'use client';

import { LANGUAGES } from '@/libs/languages';
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
import { usePersistentStore } from '../hooks/use-persistent-store';
import { ROUTES } from '../libs/routes';
import { HistorySection } from '../components/features/settings/history-section';
import { StartupSection } from '../components/features/settings/startup-section';

type FormValues = {
  assistantLanguage?: (typeof LANGUAGES)[keyof typeof LANGUAGES]['code'];
  isLaunchedOnStartup?: boolean;
};
export interface Model {
  id: string;
  name: string;
  isActive: boolean;
}
export function SettingsPage() {
  const persistentStore = usePersistentStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(
    persistentStore.getStore(),
  );

  const { toast } = useToast();

  useEffect(() => {
    const store = persistentStore.getStore();
    setFormValues({
      assistantLanguage: store?.assistantLanguage,
      isLaunchedOnStartup: store?.isLaunchedOnStartup,
    });
  }, [persistentStore.isStoreInitialized]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('request-open-window');
    window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', false, {
      forward: true,
    });
  }, []);

  const hasFieldChanged = (
    field: keyof Pick<FormValues, 'assistantLanguage' | 'isLaunchedOnStartup'>,
  ) => {
    const s = persistentStore.getStore();
    if (s) {
      return s[field] !== formValues[field];
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (hasFieldChanged('isLaunchedOnStartup')) {
      window.electron.ipcRenderer.invoke(
        'set-app-auto-launch',
        formValues.isLaunchedOnStartup,
      );
    }

    if (hasFieldChanged('assistantLanguage')) {
      const modelFile = new ModelFile();
      persistentStore.setStore(
        'assistantLanguage',
        formValues.assistantLanguage,
      );
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
      isLaunchedOnStartup: checked,
    });
  };

  const lancheOnStartCheckbox = (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="isLaunchedOnStartup"
        name="isLaunchedOnStartup"
        checked={formValues.isLaunchedOnStartup}
        onCheckedChange={(checked) =>
          setFormValues({
            ...formValues,
            isLaunchedOnStartup: checked as boolean,
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
        isLaunchedOnStartup={formValues.isLaunchedOnStartup || false}
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
