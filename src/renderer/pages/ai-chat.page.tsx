
import { AiChat } from '../features/ai-chat/ai-chat';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '@/routes';
import { useCallback, useEffect, useState } from 'react';
import { useAppStore } from '../hooks/use-app-store';
import { useNavigate } from 'react-router-dom';
import { ShortcutAPI } from '@/main/modules/shortcuts/shortcut-api';
import { WindowAPI } from '@/main/modules/window/window-api';

export function AiChatPage() {
  const { isDialogOpen } = useAppStore();

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isDialogOpen && e.key === 'Escape') {
        setIsVisible(false);
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isDialogOpen]);

  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate()
  const handleGoIdle = useCallback(() => {
    setIsVisible(false)
    WindowAPI.toggleWindowWithAnimation(false)
  }, [setIsVisible])

  useEffect(() => {
    const unsubscribe = ShortcutAPI.addGlobalShortcutListener(handleGoIdle);
    return unsubscribe
  }, [handleGoIdle])

  return (
    <div className="h-full overflow-y-hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.15,
            }}
            onAnimationComplete={(definition: { opacity: number, y: number }) => {
              if (definition.opacity === 0) {
                navigate(ROUTES.idle)
              }
            }}
          >
            <AiChat />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
