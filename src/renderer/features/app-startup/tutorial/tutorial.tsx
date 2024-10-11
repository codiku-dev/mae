import { useEffect } from 'react';
import { useAppStore } from '@/renderer/hooks/use-app-store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/renderer/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { ROUTES } from '@/routes';
import { ShortcutAPI } from '@/main/modules/shortcuts/shortcut-api';
import { useLocation, useNavigate } from 'react-router-dom';
import { WindowAPI } from '@/main/modules/window/window-api';

export const Tutorial = () => {
    const { pathname } = useLocation();
    const { setIsFirstRun } = useAppStore();
    const navigate = useNavigate();

    useEffect(function addOpenCloseListener() {
        const handleGoToHome = () => {
            setIsFirstRun(false);
            navigate(ROUTES.home);
        }
        ShortcutAPI.addGlobalShortcutListener(handleGoToHome)
        return () => {
            ShortcutAPI.removeGlobalShortcutListener(handleGoToHome);
        };
    }, [pathname]);

    return (
        <Dialog open onOpenChange={(open) => {
            if (!open) {
                setIsFirstRun(false);
                WindowAPI.toggleWindowWithAnimation(false)
                setTimeout(() => {
                    navigate(ROUTES.idle);
                }, 400)
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
