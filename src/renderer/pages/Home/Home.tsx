import { OllamaService } from '@/main/services/ollama/ollama.service';
import { Error } from '@/renderer/components/features/error';
import { RichResponse } from '@/renderer/components/features/rich-response';
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
  const [isStreamingFinished, setIsStreamingFinished] = useState(true);
  const [submitedPrompt, setSubmitedPrompt] = useState('');
  const [error, setError] = useState('');
  const [isAIWorking, setIsAIWorking] = useState(false);
  const stopAndResetAll = () => {
    OllamaService.getInstance().abortAllRequests();
    setStreamedResponse('');
    setValue('');
    setError('');
    setIsLoading(false);
    setIsStreamingFinished(true);
    setIsAIWorking(false);
  };

  useEffect(makeInteractiveClassClickable, []);

  useEffect(function addOpenCloseListener() {
    window.electron.ipcRenderer.on('global-shortcut', (e) => {
      if (e.data.shortcut === 'CommandOrControl+Shift+P') {
        logToMain('CommandOrControl+Shift+P received');
        console.log('CommandOrControl+Shift+P received');
        setIsVisible((prev) => {
          return !prev;
        });
      }
    });
    window.electron.ipcRenderer.on('global-shortcut', (e) => {
      if (e.data.shortcut === 'Escape') {
        console.log('Escape received');
        setIsVisible(false);
      }
    });
    window.electron.ipcRenderer.on('on-main-window-blur', () => '');
  }, []);

  const handleSubmit = useCallback(async (submittedText: string) => {
    if (submittedText !== '') {
      setIsAIWorking(true);
      setSubmitedPrompt(submittedText);
      setStreamedResponse('');
      setIsLoading(true);
      setIsStreamingFinished(false);
      setError('');
      OllamaService.getInstance().requestLlamaStream(
        submittedText,
        'question',
        (chunk) => {
          if (chunk.done === false) {
            setStreamedResponse((prev) => prev + chunk.message.content);
            setIsLoading(false);
          } else {
            setIsStreamingFinished(true);
            setIsAIWorking(false);
            setIsLoading(false);
          }
        },
        () => {
          setError('Something went wrong...Make sur the LLM is started !');
          setIsLoading(false);
          setIsStreamingFinished(true);
          setIsAIWorking(false);
        },
      );
    }
  }, []);

  return (
    <div id="container" className={cn('w-full h-full', isVisible && '')}>
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
                setTimeout(() => {
                  window.electron.ipcRenderer.sendMessage(
                    'request-close-window',
                  );
                }, 100);
              } else {
                setTimeout(() => {
                  logToMain('MIA : request-focus-window');
                  window.electron.ipcRenderer.sendMessage(
                    'request-focus-window',
                  );
                }, 100);
              }
            }}
          >
            <div className="w-screen">
              <div className="flex flex-col  items-center ">
                <div id="ai-searchbar" className="w-96">
                  <SearchBar
                    value={value}
                    onChange={setValue}
                    onSubmit={handleSubmit}
                    isLoading={isAIWorking}
                    onClickStop={stopAndResetAll}
                  />
                </div>
                <div id="ai-response" className="interactive w-1/2">
                  {(isLoading ||
                    (streamedResponse && streamedResponse !== '')) && (
                    <RichResponse
                      output={streamedResponse}
                      isStreamFinished={isStreamingFinished}
                      question={submitedPrompt}
                      isLoading={isLoading}
                    />
                  )}
                  {error && <Error errorMessage={error} />}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
