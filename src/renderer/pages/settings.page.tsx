'use client';

import { LanguageCode, LANGUAGES } from '@/libs/languages';
import { Button } from '@/renderer/components/ui/button';
import { useToast } from '@/renderer/hooks/use-toast';
import { useEffect, useState, useState } from 'react';
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ModelFile } from '@/main/services/ollama/Modelfile';
import { ollamaService } from '@/main/services/ollama/ollama.service';
import { Loader2, X } from 'lucide-react';
import { LanguageSelection } from '../components/features/settings/language-selection';
import { ROUTES } from '../libs/routes';
import { HistorySection } from '../components/features/settings/history-section';
import { StartupSection } from '../components/features/settings/startup-section';
import { useAppStore } from '../hooks/use-app-store';

type FormValues = {
  isAppLaunchedOnStartup: boolean;
  assistantLanguage: LanguageCode;
};
export function SettingsPage() {
  const {
    isAppLaunchedOnStartup,
    assistantLanguage,
    setIsAppLaunchedOnStartup,
    setAssistantLanguage,
  } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    defaultValues: {
      isAppLaunchedOnStartup,
      assistantLanguage,
    },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('request-open-window');
    window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', false, {
      forward: true,
    });
  }, []);

  const submit: SubmitHandler<FormValues> = async (data) => {
    if (data.isAppLaunchedOnStartup !== isAppLaunchedOnStartup) {
      setIsAppLaunchedOnStartup(data.isAppLaunchedOnStartup);
      window.electron.ipcRenderer.invoke(
        'set-app-auto-launch',
        data.isAppLaunchedOnStartup,
      );
    }
    if (data.assistantLanguage !== assistantLanguage) {
      const modelFile = new ModelFile();
      setAssistantLanguage(data.assistantLanguage as LanguageCode);
      modelFile.addRule(
        `You will answer the user exclusively with the following language: ${LANGUAGES[data.assistantLanguage as LanguageCode].name}. Even if the user is speaking another language than the one you are answering in, you will answer in the language you are speaking in.`,
      );
      try {
        setIsLoading(true);
        await ollamaService.createOllamaModelFromModelFile(modelFile);
        setIsLoading(false);
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
    <FormProvider {...form}>
      <form
        className="h-screen w-screen p-4 space-y-6 bg-white relative"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">MIA Settings</h1>
          {closeButton}
        </div>

        <LanguageSelection name="assistantLanguage" />

        <StartupSection name="isAppLaunchedOnStartup" />

        <HistorySection />

        <Button type="submit" disabled={isLoading}>
          {isDirty ? (
            'Apply'
          ) : (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Applying...
            </>
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
