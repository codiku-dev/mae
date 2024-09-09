'use client';

import { LANGUAGES } from '@/libs/languages';
import { Button } from '@/renderer/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/renderer/components/ui/card';
import { Label } from '@/renderer/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/renderer/components/ui/select';
import { Switch } from '@/renderer/components/ui/switch';
import { useToast } from '@/renderer/hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';

// Mock data

export interface Model {
  id: string;
  name: string;
  isActive: boolean;
}

import { ModelFile } from '@/main/services/ollama/Modelfile';
import { OllamaService } from '@/main/services/ollama/ollama.service';
import { X } from 'lucide-react';
import { usePersistentStore } from '../hooks/use-persistent-store';
import { ROUTES } from '../libs/routes';
import { ModelSelection } from '../components/features/settings/model-selection';
import { LanguageSelection } from '../components/features/settings/language-selection';

export function SettingsPage() {
  const persistentStore = usePersistentStore();
  const { toast } = useToast();
  const [currentLanguage, setCurrentLanguage] = useState(
    persistentStore.getStore().assistantLanguage,
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

  return (
    <form className="h-screen w-screen p-4 space-y-6 bg-white relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">MIA Settings</h1>
        {closeButton}
      </div>
      <ModelSelection />
      <LanguageSelection
        currentLanguage={currentLanguage}
        onChange={(language) => {
          setCurrentLanguage(language);
        }}
      />
      <Button type="button" onClick={handleSubmit}>
        Apply
      </Button>
    </form>
  );
}
