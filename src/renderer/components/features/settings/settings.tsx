'use client';

import { LanguageCode, LANGUAGES } from '@/libs/languages';
import { Button } from '@/renderer/components/ui/button';
import { useToast } from '@/renderer/hooks/use-toast';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { ModelFile } from '@/renderer/services/ollama/Modelfile';
import { ollamaService } from '@/renderer/services/ollama/ollama.service';
import { Loader2, Save, X } from 'lucide-react';
import { LanguageSelectionSection } from './language-selection-section';
import { ROUTES } from '../../../../routes';
import { HistorySection } from './history-section';
import { StartupSection } from './startup-section';
import { IndexedWebsiteSection } from './indexed-websites-section';
import { useSettings } from '../../../hooks/use-settings';
import { useConversations } from '../../../hooks/use-conversations';
import { useSearch } from '../../../hooks/use-search';
import { ModelSelection } from './model-selection';

type FormValues = {
    isAppLaunchedOnStartup: boolean;
    assistantLanguage: LanguageCode;
    modelId: string;
};
export function Settings() {
    const { indexedWebsitesContent } = useSearch();
    const { conversationHistory } = useConversations();
    const { isAppLaunchedOnStartup, assistantLanguage, setIsAppLaunchedOnStartup, setAssistantLanguage, getCurrentModel, setAvailableModels, availableModels } = useSettings();
    const currentModel = getCurrentModel()

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        defaultValues: {
            isAppLaunchedOnStartup,
            assistantLanguage,
            modelId: currentModel.id
        },
    });
    const { handleSubmit } = form;

    useEffect(() => {
        window.electron.ipcRenderer.sendMessage('request-open-window');
        window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', false, {
            forward: true,
        });
    }, []);

    const submit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        let requireModelUpdate = false
        const modelFile = new ModelFile()
        if (data.isAppLaunchedOnStartup !== isAppLaunchedOnStartup) {
            setIsAppLaunchedOnStartup(data.isAppLaunchedOnStartup);
            window.electron.ipcRenderer.invoke(
                'set-app-auto-launch',
                data.isAppLaunchedOnStartup,
            );
        }
        if (data.assistantLanguage !== assistantLanguage) {
            setAssistantLanguage(data.assistantLanguage as LanguageCode);
            modelFile.addRule(
                `You will answer the user exclusively with the following language: ${LANGUAGES[data.assistantLanguage as LanguageCode].name}. Even if the user is speaking another language than the one you are answering in, you will answer in the language you are speaking in.`,
            );
            requireModelUpdate = true
            try {


            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to set new language',
                });
                return;
            }
        }

        if (data.modelId !== currentModel.id) {
            modelFile.setFrom(data.modelId);
            setAvailableModels(availableModels.map(model => {
                return { ...model, isActive: model.id === data.modelId }
            }))
            requireModelUpdate = true
            // warmup the mdel

        }
        if (requireModelUpdate) {
            console.log("creating model")
            await ollamaService.createOllamaModelFromModelFile(data.modelId + "-mia", modelFile);
            console.log("warming up model")
            await ollamaService.requestLlamaStream(data.modelId, [{ role: "user", content: "Hello" }], "", undefined, undefined, false)
        }

        setIsLoading(false);

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
                window.electron.ipcRenderer.sendMessage('request-close-window');
            }}
        >
            <X className="h-6 w-6" />
        </Button>
    );

    return (
        <FormProvider {...form}>
            <form
                className=" p-4 space-y-6 relative bg-white/80"
                onSubmit={handleSubmit(submit)}
            >
                <div className="sticky top-0 flex w-full justify-between items-center">
                    <h1 className="text-2xl font-bold">MIA Settings</h1>
                    {closeButton}
                </div>

                <div className="h-[703px] overflow-y-auto flex flex-col gap-4">
                    <ModelSelection name="modelId" />

                    <LanguageSelectionSection name="assistantLanguage" />

                    <StartupSection name="isAppLaunchedOnStartup" />

                    {conversationHistory.length > 0 && <HistorySection />}

                    {indexedWebsitesContent.length > 0 && (
                        <IndexedWebsiteSection />
                    )}

                    <Button type="submit" className='shadow-md fixed bottom-8 right-8 ' disabled={isLoading}>
                        {!isLoading ? (
                            <div className='flex items-center gap-2'>
                                <span>Apply</span>
                                <Save size={16} />
                            </div>
                        ) : (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Applying...
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
