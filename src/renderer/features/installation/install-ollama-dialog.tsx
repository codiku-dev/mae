import { useEffect } from 'react';
import { useToast } from '@/renderer/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/renderer/ui/dialog';
import { LoadingSpinner } from '@/renderer/ui/loading-spinner';

interface Props {
    onInstallationComplete: () => void;
}

export const InstallOllamaDialog = (p: Props) => {
    const { toast } = useToast();

    useEffect(() => {
        installOllama();
    }, []);

    const installOllama = async () => {
        try {
            await window.electron.ipcRenderer.invoke('install-ollama')
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
        <div className=' fixed top-[30%] p-8 shadow-lg m-20' >
            <div className='text-2xl font-semibold'>Installing Ollama (~440mb)</div>
            <div >
                <div className="flex gap-4 items-center py-4">
                    <LoadingSpinner className="mr-2" />
                    <p>Mia needs the Ollama application to run. Please wait while Ollama is being installed...</p>
                </div>
                <p className='text-sm'>Don't forget to uninstall the Ollama application if you decide to uninstall Mia.</p>
            </div>
        </div>
    );
};