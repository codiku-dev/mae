import { useState, useEffect } from 'react';
import { useToast } from '../../../hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { LoadingSpinner } from '../../ui/loading-spinner';

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
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Installing Ollama</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center p-6">
                    <LoadingSpinner className="mr-2" />
                    <p>Mia needs the Ollama application to run. Please wait while Ollama is being installed...</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};