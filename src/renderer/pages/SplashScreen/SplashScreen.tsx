import { cn, logToMain } from '@/renderer/libs/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/icon.png';
export const SplashScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    logToMain('Mia: SplashScreen mounted');
    const handleBeforeStartReply = () => {
      setIsLoading(false);
      logToMain('Mia: Navigating to home');
      navigate('/home');
    };

    logToMain('Mia: Sending request before start');
    window.electron.ipcRenderer.sendMessage('request-before-start');
    window.electron.ipcRenderer.on(
      'before-start-reply',
      handleBeforeStartReply,
    );
  }, []);

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-transparent h-screen ',
      )}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={icon}
            alt="Loading"
            className="size-32"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
