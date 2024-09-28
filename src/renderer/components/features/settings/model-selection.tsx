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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/renderer/components/ui/dialog';
import { useSettings } from '@/renderer/hooks/use-settings';
import { Button } from '@/renderer/components/ui/button';

import { useState } from 'react';
import { Model } from '@/types/model-type';
import { Loader2 } from 'lucide-react';

export const ModelSelection = () => {
  const {
    availableModels,
    setAvailableModels,
    lastFetchAvailableModelsISODate,
    setLastFetchAvailableModelsISODate,
  } = useSettings();
  const [isInstallModelDialogOpen, setIsInstallModelDialogOpen] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installationStatus, setInstallationStatus] = useState<'idle' | 'confirm' | 'loading' | 'success' | 'error'>('idle');
  const [currentModelIdToInstall, setCurrentModelIdToInstall] = useState<string>("");
  const activeModel = availableModels.find(model => model.isActive)
  const installedModels = availableModels.filter(model => model.isInstalled)
  const currentModelToInstall = availableModels.find(model => model.id === currentModelIdToInstall)
  // useEffect(function fetchAndScrapAvailableModel() {
  //   const shouldFetch =
  //     lastFetchAvailableModelsISODate === '' ||
  //     new Date().getTime() -
  //     new Date(lastFetchAvailableModelsISODate).getTime() >
  //     7 * 24 * 60 * 60 * 1000;

  //   if (shouldFetch) {
  //     ollamaService.fetchAvailableModels().then((modelsName) => {
  //       setAvailableModels(
  //         modelsName.map((model) => ({
  //           id: model,
  //           name: model,
  //           isActive: false,
  //         })),
  //       );
  //       setLastFetchAvailableModelsISODate(new Date().toISOString());
  //     });
  //   }
  // }, []);

  const handleSetCurrentModel = (id: string) => {
    setAvailableModels(
      availableModels.map((model) =>
        model.id === id ? { ...model, isActive: true } : model,
      ),
    );
  };

  // const handleDeleteModel = (id: string) => {
  //   setAvailableModels(availableModels.filter((model) => model.id !== id));
  // };

  const handleSelectModelToInstall = (modelNameId: string) => {
    setIsInstallModelDialogOpen(true);
    setCurrentModelIdToInstall(modelNameId)
    setInstallationStatus('confirm');
  }

  const confirmInstall = async () => {
    setInstallationStatus('loading');
    console.log("calling the selected model", currentModelToInstall)
    try {
      await window.electron.ipcRenderer.invoke('pull-ollama-model', currentModelToInstall?.id);
      setAvailableModels(
        availableModels.map(model =>
          model.id === currentModelIdToInstall ? { ...model, isInstalled: true } : model
        )
      )
      setInstallationStatus("success");
    } catch (error) {
      console.error('Error installing model:', error);
      setInstallationStatus('error');
    }
  };

  const handleCancelInstall = () => {
    setIsInstallModelDialogOpen(false);
    setInstallationStatus("idle")
    setCurrentModelIdToInstall("")
  }

  const dialogInstallModel = (
    <Dialog open={isInstallModelDialogOpen} onOpenChange={setIsInstallModelDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {installationStatus === 'confirm' ? 'Confirm Installation' :
              installationStatus === 'loading' ? 'Installing Model' :
                installationStatus === 'success' ? 'Installation Successful' :
                  installationStatus === 'error' ? 'Installation Failed' : 'Install Model'}
          </DialogTitle>
          <DialogDescription>
            {installationStatus === 'confirm' && (
              <div>
                <p>You are about to install the model <strong>{currentModelToInstall?.label}</strong></p>
                Size:  <strong>{currentModelToInstall?.size} GB</strong>
                <p>Do you want to proceed with the installation?</p>
              </div>
            )}
            {installationStatus === 'loading' && (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Installing model. Please don't stop the app or the download will fail.</span>
              </div>
            )}
            {installationStatus === 'success' && <div><p>The model has been successfully installed.</p>
              <p>You can know select id to make it your current model</p></div>}
            {installationStatus === 'error' && <div>An error occurred while installing the model. Please try again.</div>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {installationStatus === 'confirm' ? (
            <>
              <Button onClick={handleCancelInstall} variant="outline">Cancel</Button>
              <Button onClick={confirmInstall}>Confirm Install</Button>
            </>
          ) : installationStatus === 'loading' ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Installing...
            </Button>
          ) : (
            <Button onClick={() => setIsInstallModelDialogOpen(false)}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const selectBoxSetCurrentModel = <div><Label>Current model</Label>
    <Select onValueChange={handleSetCurrentModel} defaultValue={activeModel?.id}>
      <SelectTrigger>
        <SelectValue placeholder="Select an AI model" />
      </SelectTrigger>
      <SelectContent>
        {installedModels.map((model) => (
          <SelectItem key={model.id} value={model.name}>
            {model.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  console.log("currentModelToInstallFormValue", currentModelIdToInstall)
  const selectBoxToInstallModel = (
    <div>
      <Label>Install other models</Label>
      <Select onValueChange={handleSelectModelToInstall} value={currentModelIdToInstall}>
        <SelectTrigger>
          <SelectValue placeholder="Select an AI model to install" />
        </SelectTrigger>
        <SelectContent>
          {availableModels.filter(model => !model.isInstalled).map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Models</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col gap-4">
        {selectBoxSetCurrentModel}
        {selectBoxToInstallModel}
        {dialogInstallModel}
      </CardContent>
    </Card>
  );
};
