import { useEffect, useState } from 'react';
import { useToast } from '@/renderer/hooks/use-toast';
import { LoadingSpinner } from '@/renderer/ui/loading-spinner';
import { OllamaAPI } from '@/main/modules/ollama/ollama-api';

interface Props {
    onInstallationComplete: () => void;
}

export const InstallOllamaDialog = (p: Props) => {
    const [output, setOutput] = useState<string[]>([]);
    const { toast } = useToast();

    const appendLogs = (output_: string) => {
        setOutput(prev => [...prev, output_]);
    }
    useEffect(() => {
        installOllama();
        OllamaAPI.onInstallationProgress(appendLogs);
        return () => {
            OllamaAPI.removeInstallationProgressListener(appendLogs);
        };
    }, []);

    const installOllama = async () => {
        try {
            console.log('Installing Ollama...');
            await OllamaAPI.installOllama();
            console.log('Ollama installed');
            p.onInstallationComplete();
        } catch (error) {
            toast({
                title: "Ollama Installation Error",
                description: "An error occurred while installing Ollama. Please try again.",
                variant: 'destructive',
            });
            console.error('Error installing Ollama:', error);
        }
    };

    return (
        <div className='fixed top-[30%] p-8 shadow-lg m-20 bg-white rounded-lg max-w-2xl w-full'>
            <div className='text-2xl font-semibold mb-4'>
                Installing Ollama (~440mb)
            </div>
            <div>
                <div className="flex gap-4 items-center py-4">
                    <LoadingSpinner className="mr-2" />
                    <p>Mia needs the Ollama application to run. Please wait while Ollama is being installed...</p>
                </div>
                <div className='mt-4 bg-gray-100 p-4 rounded-md max-h-60 overflow-y-auto'>
                    {output.map((line, index) => (
                        <p key={index} className='text-sm font-mono mb-1'>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};