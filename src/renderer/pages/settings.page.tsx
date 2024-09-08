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

interface Model {
  id: string;
  name: string;
  isActive: boolean;
}

import { ModelFile } from '@/main/services/ollama/Modelfile';
import { OllamaService } from '@/main/services/ollama/ollama.service';
import { X } from 'lucide-react';
import { usePersistentStore } from '../hooks/use-persistent-store';
import { ROUTES } from '../libs/routes';

export function SettingsPage() {
  const persistentStore = usePersistentStore();
  const { toast } = useToast();
  const [currentLanguage, setCurrentLanguage] = useState(
    persistentStore.getStore().assistantLanguage,
  );
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [installedModels, setInstalledModels] = useState<Model[]>([]);
  const [installingModel, setInstallingModel] = useState<string | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('request-open-window');
    window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', false, {
      forward: true,
    });
  }, []);

  useEffect(function fetchAndScrapAvailableModel() {
    const shouldFetch =
      persistentStore.getStore().lastFetchAvailableModelsISODate === '' ||
      new Date().getTime() -
        new Date(
          persistentStore.getStore().lastFetchAvailableModelsISODate,
        ).getTime() >
        7 * 24 * 60 * 60 * 1000;

    if (shouldFetch) {
      console.log('fetching from ollama');
      OllamaService.getInstance()
        .fetchAvailableModels()
        .then((modelsName) => {
          setAvailableModels(
            modelsName.map((model) => ({
              id: model,
              name: model,
              isActive: false,
            })),
          );
          persistentStore.setStore(
            'lastFetchAvailableModelsISODate',
            new Date().toISOString(),
          );
          persistentStore.setStore('availableModels', modelsName);
        });
    } else {
      setAvailableModels(
        persistentStore.getStore().availableModels.map((model) => ({
          id: model,
          name: model,
          isActive: false,
        })),
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    persistentStore.setStore('assistantLanguage', currentLanguage);
    const modelFile = new ModelFile();
    modelFile.setLanguage(LANGUAGES[currentLanguage].name);
    const response =
      await OllamaService.getInstance().createOllamaModelFromModelFile(
        modelFile,
      );
    toast({
      title: 'Settings saved',
      description: 'Your changes have been successfully applied.',
    });
  };
  const handleToggleModel = (id: string) => {
    setInstalledModels((models) =>
      models.map((model) =>
        model.id === id ? { ...model, isActive: !model.isActive } : model,
      ),
    );
  };

  const handleDeleteModel = (id: string) => {
    setInstalledModels((models) => models.filter((model) => model.id !== id));
  };

  const handleAddModel = (modelName: string) => {
    setInstallingModel(modelName);
    // Simulate installation process
    setTimeout(() => {
      setInstalledModels((models) => [
        ...models,
        { id: Date.now().toString(), name: modelName, isActive: false },
      ]);
      setInstallingModel(null);
    }, 2000);
  };

  const closeButton = (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="absolute top-4 right-4"
      onClick={() => {
        window.electron.ipcRenderer.sendMessage('navigate', ROUTES.home);
      }}
    >
      <X className="h-6 w-6" />
    </Button>
  );
  const languageSection = useMemo(
    () => (
      <Card>
        <CardHeader>
          <CardTitle>Assistant language</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={currentLanguage}
            onValueChange={(value) => {
              console.log('you are slecting ', value);
              setCurrentLanguage(value as keyof typeof LANGUAGES);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(LANGUAGES).map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    ),
    [currentLanguage],
  );

  const modelSection = (
    <Card>
      <CardHeader>
        <CardTitle>Model</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {installedModels.map((model) => (
          <div key={model.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                checked={model.isActive}
                onCheckedChange={() => handleToggleModel(model.id)}
              />
              <Label>{model.name}</Label>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteModel(model.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Select onValueChange={handleAddModel}>
          <SelectTrigger>
            <SelectValue placeholder="Add new model" />
          </SelectTrigger>
          <SelectContent>
            {availableModels
              .filter(
                (model) => !installedModels.some((m) => m.name === model.name),
              )
              .map((model) => (
                <SelectItem key={model.name} value={model.name}>
                  {model.name}
                  {installingModel === model.name && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
  return (
    <form className="h-screen w-screen p-4 space-y-6 bg-white relative">
      <h1 className="text-2xl font-bold">MIA Settings</h1>
      {closeButton}
      {modelSection}
      {languageSection}
      <Button type="button" onClick={handleSubmit}>
        Apply
      </Button>
    </form>
  );
}
