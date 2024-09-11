'use client';

import { LANGUAGES } from '@/libs/languages';
import { Button } from '@/renderer/components/ui/button';
import { Checkbox } from '@/renderer/components/ui/checkbox';
import { useToast } from '@/renderer/hooks/use-toast';
import React, { useEffect, useState } from 'react';

// Mock data

export interface Model {
  id: string;
  name: string;
  isActive: boolean;
}

import { ModelFile } from '@/main/services/ollama/Modelfile';
import { OllamaService } from '@/main/services/ollama/ollama.service';
import { X } from 'lucide-react';
import { LanguageSelection } from '../components/features/settings/language-selection';
import { usePersistentStore } from '../hooks/use-persistent-store';
import { ROUTES } from '../libs/routes';

export function SettingsPage() {
  const persistentStore = usePersistentStore();
  const { toast } = useToast();
  const [currentLanguage, setCurrentLanguage] = useState(
    persistentStore.getStore().assistantLanguage,
  );
  const [isLaunchedOnStartup, setIsLaunchedOnStartup] = useState(
    persistentStore.getStore().isLaunchedOnStartup,
  );

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('request-open-window');
    window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', false, {
      forward: true,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    persistentStore.setStore('assistantLanguage', currentLanguage);
    persistentStore.setStore('isLaunchedOnStartup', isLaunchedOnStartup);
    const modelFile = new ModelFile();

    modelFile.addRule(
      `You will answer the user exclusively with the following language: ${LANGUAGES[currentLanguage].name}. Do not provide extra translations in your answers.`,
    );
    try {
      await OllamaService.getInstance().createOllamaModelFromModelFile(
        modelFile,
      );
      toast({
        title: 'Settings saved',
        description: 'Your changes have been successfully applied.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to set new language',
      });
    }
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

  const handleLaunchOnStartupChange = (value: boolean) => {
    persistentStore.setStore('isLaunchedOnStartup', value);
    window.electron.ipcRenderer.invoke('update-launch-on-startup', value);
  };
  const lancheOnStartCheckbox = (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="isLaunchedOnStartup"
        checked={isLaunchedOnStartup}
        onCheckedChange={(checked) =>
          handleLaunchOnStartupChange(checked as boolean)
        }
      />
      <label
        htmlFor="isLaunchedOnStartup"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Launch on startup
      </label>
    </div>
  );

  return (
    <form className="h-screen w-screen p-4 space-y-6 bg-white relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">MIA Settings</h1>
        {closeButton}
      </div>

      <LanguageSelection
        currentLanguage={currentLanguage}
        onChange={(language) => {
          setCurrentLanguage(language);
        }}
      />
      {lancheOnStartCheckbox}
      <Button type="button" onClick={handleSubmit}>
        Apply
      </Button>
    </form>
  );
}
