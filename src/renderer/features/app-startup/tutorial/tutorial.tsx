import { useEffect } from 'react';
import { useAppStore } from '@/renderer/hooks/use-app-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/renderer/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { ROUTES } from '@/routes';
import { NavigatorAPI } from '@/main/modules/navigator/navigator-api';
import { WindowAPI } from '@/main/modules/window/window-api';
import { ShortcutAPI } from '@/main/modules/shortcuts/shortcut-api';

export const Tutorial = () => {

    const { setIsFirstRun } = useAppStore();

    useEffect(function addOpenCloseListener() {
        const unsubscribeGlobalShortcut = ShortcutAPI.onGlobalShortcut(
            (shortcut) => {
                if (shortcut === 'CommandOrControl+Shift+P') {
                    setIsFirstRun(false);
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
                NavigatorAPI.navigate(ROUTES.idle);
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
