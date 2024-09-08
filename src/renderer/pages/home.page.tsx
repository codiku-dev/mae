import { OllamaService } from '@/main/services/ollama/ollama.service';
import { Error } from '@/renderer/components/features/error';
import { RichResponse } from '@/renderer/components/features/rich-response';
import { Button } from '@/renderer/components/ui/button';
import { cn, logToMain } from '@/renderer/libs/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/features/searchbar';

export function HomePage() {
  const [value, setValue] = useState<string>('');
  const [streamedResponse, setStreamedResponse] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleStopStream = () => {
    OllamaService.getInstance().abortAllRequests();
    setValue('');
    setError('');
    setIsLoading(false);
    setIsStreamingFinished(true);
    setIsAIWorking(false);
  };

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(
      'on-searchbar-visibilty-change',
      isVisible,
    );
  }, [isVisible]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', true, {
      forward: true,
    });
  }, []);

  useEffect(function addOpenCloseListener() {
    // requestFocus
    logToMain('addOpenCloseListener()');

    const unsubscribeGlobalShortcut = window.electron.ipcRenderer.on(
      'global-shortcut',
      (e) => {
        logToMain('GLOBAL SHORTCUT ');
        if (e.data.shortcut === 'CommandOrControl+Shift+P') {
          setIsVisible((prev) => {
            logToMain('UPDATE VISIBILITY');
            return !prev;
          });
        }
      },
    );
    const unsubscribeEscapeShortcut = window.electron.ipcRenderer.on(
      'global-shortcut',
      (e) => {
        if (e.data.shortcut === 'Escape') {
          setIsVisible(false);
        }
      },
    );
    // window.electron.ipcRenderer.on('on-main-window-blur', () => '');
    return () => {
      unsubscribeGlobalShortcut();
      unsubscribeEscapeShortcut();
    };
  }, []);

  const handleSubmit = async (submittedText: string) => {
    if (submittedText !== '') {
      setIsAIWorking(true);
      setSubmitedPrompt(submittedText);
      setStreamedResponse('');
      setIsLoading(true);
      setIsStreamingFinished(false);
      setValue('');
      setError('');
      OllamaService.getInstance().requestLlamaStream(
        submittedText,
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
          setError('Something went wrong...');
          setIsLoading(false);
          setIsStreamingFinished(true);
          setIsAIWorking(false);
        },
      );
    }
  };

  const clearButton = (
    <div className="flex justify-end h-6">
      {streamedResponse && (
        <Button
          id="ai-clear-button"
          className="interactive"
          onClick={stopAndResetAll}
          size="sm"
          variant={'outline'}
        >
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
      )}
    </div>
  );

  return (
    <div id="container" className={cn('w-full h-full')}>
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
                setTimeout(() => {
                  window.electron.ipcRenderer.sendMessage(
                    'request-close-window',
                  );
                }, 100);
              } else {
                setTimeout(() => {
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
                    onClickStop={handleStopStream}
                  />
                </div>
                <div id="ai-response" className="interactive w-3/5">
                  {clearButton}
                  {(isLoading ||
                    (streamedResponse && streamedResponse !== '')) && (
                    <RichResponse
                      key={submitedPrompt}
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
