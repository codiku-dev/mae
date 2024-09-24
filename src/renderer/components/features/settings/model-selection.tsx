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
import { useEffect, useState } from 'react';
import { ollamaService } from '@/main/services/ollama/ollama.service';
import { Model } from '@/types/model-type';
import { useSettings } from '@/renderer/hooks/use-settings';
export const ModelSelection = () => {
  const {
    availableModels,
    setAvailableModels,
    lastFetchAvailableModelsISODate,
    setLastFetchAvailableModelsISODate,
  } = useSettings();

  const [installedModels, setInstalledModels] = useState<Model[]>([]);
  const [installingModel, setInstallingModel] = useState<string | null>(null);

  useEffect(function fetchAndScrapAvailableModel() {
    const shouldFetch =
      lastFetchAvailableModelsISODate === '' ||
      new Date().getTime() -
      new Date(lastFetchAvailableModelsISODate).getTime() >
      7 * 24 * 60 * 60 * 1000;

    if (shouldFetch) {
      ollamaService.fetchAvailableModels().then((modelsName) => {
        setAvailableModels(
          modelsName.map((model) => ({
            id: model,
            name: model,
            isActive: false,
          })),
        );
        setLastFetchAvailableModelsISODate(new Date().toISOString());
      });
    }
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
};
