import { useEffect } from 'react';
import { useAppStore } from '@/renderer/hooks/use-app-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/renderer/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { ROUTES } from '@/routes';

export const Tutorial = () => {

    const { setIsFirstRun } = useAppStore();

    useEffect(function addOpenCloseListener() {
        const unsubscribeGlobalShortcut = window.electron.ipcRenderer.on(
            'global-shortcut',
            (e) => {
                if (e.data.shortcut === 'CommandOrControl+Shift+P') {
                    setIsFirstRun(false);
                    window.electron.ipcRenderer.sendMessage('navigate', ROUTES.home);

                }
            },
        );

        return () => {
            unsubscribeGlobalShortcut();
        };
    }, []);

    return (
        <Dialog open onOpenChange={(open) => {
            if (!open) {
                setIsFirstRun(false);
                window.electron.ipcRenderer.sendMessage('navigate', ROUTES.home);
            }
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Welcome to Mia</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                    <p>Seems like everything is setup correctly.</p>
                    <p>Try <kbd>cmd+↑+p</kbd> to open the assistant</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};
