import { cn } from '@/renderer/libs/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import icon from '../../assets/icon.png';
export const SplashScreen: React.FC = () => {
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
