import { LangChainService } from '@/main/services/langchain/langchain.service';
import { Error } from '@/renderer/components/features/error';
import { Response } from '@/renderer/components/features/response';
import {
  cn,
  logToMain,
  makeInteractiveClassClickable,
} from '@/renderer/libs/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { SearchBar } from '../../components/features/searchbar';

export function Home() {
  const [value, setValue] = useState<string>('');
  const [streamedResponse, setStreamedResponse] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const stopAndResetAll = () => {
    LangChainService.getInstance().abortAllRequests();
    setIsVisible(false);
    setStreamedResponse('');
    setValue('');
    setError('');
  };

  useEffect(makeInteractiveClassClickable, []);

  useEffect(
    function focusMainWindowOnVisible() {
      if (isVisible) {
        window.electron.ipcRenderer.sendMessage('request-focus-window');
      }
    },
    [isVisible],
  );

  useEffect(function addOpenCloseListener() {
    window.electron.ipcRenderer.on('global-shortcut', (e) => {
      if (e.data.shortcut === 'CommandOrControl+Shift+P') {
        setIsVisible((prev) => {
          return !prev;
        });
      }
    });
    window.electron.ipcRenderer.on('global-shortcut', (e) => {
      if (e.data.shortcut === 'Escape') {
        setIsVisible(false);
      }
    });
    window.electron.ipcRenderer.on('on-main-window-blur', () => { });
  }, []);

  const handleSubmit = useCallback(async (submittedText: string) => {
    if (submittedText !== '') {
      setStreamedResponse('');
      setIsLoading(true);
      logToMain("START LOADING")
      try {
        const stream = LangChainService.getInstance().requestLLM(
          submittedText,
          'question',
        );

        for await (const chunk of stream) {
          if (chunk) {
            setStreamedResponse((prev) => prev + chunk);
            logToMain("FIRST CHUNK STOP LOADING")
            setIsLoading(false);
          }
        }
      } catch (error) {
        logToMain('Error in submit: ' + error);
        setError('Something went wrong...Make sur the LLM is started !');
        setIsLoading(false);
      }
    }
  }, []);



  return (
    <div id="container" className={cn('w-full h-full', isVisible && '')}>
      <div className="flex justify-center mt-10">
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
              onAnimationComplete={(definition: {
                opacity: number;
                y: number;
              }) => {
                if (definition.opacity === 0) {
                  stopAndResetAll();
                }
              }}
            >
              <div id="ai-container" className="interactive w-96">
                <SearchBar
                  value={value}
                  onChange={setValue}
                  onSubmit={handleSubmit}
                />

                {(isLoading || (streamedResponse && streamedResponse !== "")) && <Response streamedResponse={streamedResponse} isLoading={isLoading} />}
                {error && <Error errorMessage={error} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
