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
import { Loader2, Trash2 } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

// Mock data
const allModels = ['GPT-3', 'GPT-4', 'DALL-E', 'Stable Diffusion', 'LLaMA'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

interface Model {
  id: string;
  name: string;
  isActive: boolean;
}

import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../libs/routes';
import { logToMain } from '../libs/utils';

const VirtualizedSelectContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectContent>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectContent {...props} ref={forwardedRef}>
      <List
        height={350}
        itemCount={LANGUAGES.length}
        itemSize={35}
        width="100%"
      >
        {({ index, style }) => (
          <SelectItem
            key={LANGUAGES[index].code}
            value={LANGUAGES[index].code}
            style={style}
          >
            {LANGUAGES[index].name}
          </SelectItem>
        )}
      </List>
    </SelectContent>
  );
});

VirtualizedSelectContent.displayName = 'VirtualizedSelectContent';

export function SettingsPage() {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const [installedModels, setInstalledModels] = useState<Model[]>([
    { id: '1', name: 'GPT-3', isActive: true },
    { id: '2', name: 'DALL-E', isActive: false },
  ]);
  const [installingModel, setInstallingModel] = useState<string | null>(null);

  useEffect(() => {
    logToMain('MOUTING SETTING PAGE');
    window.electron.ipcRenderer.sendMessage('request-open-window');
    window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', false, {
      forward: true,
    });
  }, []);

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

  return (
    <div className="h-screen w-screen p-4 space-y-6 bg-white relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() =>
          window.electron.ipcRenderer.sendMessage('navigate', ROUTES.home)
        }
      >
        <X className="h-6 w-6" />
      </Button>
      <h1 className="text-2xl font-bold">MIA Settings</h1>

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
              {allModels
                .filter(
                  (model) => !installedModels.some((m) => m.name === model),
                )
                .map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                    {installingModel === model && (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    )}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <VirtualizedSelectContent>
              {/* The content is now rendered by the List component */}
            </VirtualizedSelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
