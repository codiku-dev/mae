import { ollamaService } from '@/main/services/ollama/ollama.service';
import { Error } from '@/renderer/components/features/ai-search/error';
import { RichResponse } from '@/renderer/components/features/ai-search/rich-response';
import { Button } from '@/renderer/components/ui/button';
import { cn } from '@/renderer/libs/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/features/ai-search/searchbar';
import { useAppStore } from '../hooks/use-app-store';

export function HomePage() {
  const [value, setValue] = useState<string>('');
  const [streamedResponse, setStreamedResponse] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreamingFinished, setIsStreamingFinished] = useState(true);
  const [submitedPrompt, setSubmitedPrompt] = useState('');
  const [error, setError] = useState('');
  const [isAIWorking, setIsAIWorking] = useState(false);
  const { getContextFromSelectedIndexedWebsites, currentSearchSuggestions } =
    useAppStore();
  const {
    addMessageToCurrentConversation,
    getCurrentConversation,
    createNewConversation,
  } = useAppStore();

  const stopAndResetAll = () => {
    ollamaService.abortAllRequests();
    setStreamedResponse('');
    setValue('');
    setError('');
    setIsLoading(false);
    setIsStreamingFinished(true);
    setIsAIWorking(false);
  };

  const handleStopStream = () => {
    ollamaService.abortAllRequests();
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
    const unsubscribeGlobalShortcut = window.electron.ipcRenderer.on(
      'global-shortcut',
      (e) => {
        if (e.data.shortcut === 'CommandOrControl+Shift+P') {
          setIsVisible((prev) => {
            return !prev;
          });
        }
      },
    );

    return () => {
      unsubscribeGlobalShortcut();
    };
  }, []);

  const handleSubmit = async (submittedText: string) => {
    stopAndResetAll();
    if (submittedText !== '') {
      setTimeout(async () => {
        let responseContent = '';
        setIsAIWorking(true);
        setSubmitedPrompt(submittedText);
        setStreamedResponse('');
        setIsLoading(true);
        setIsStreamingFinished(false);
        setValue('');
        setError('');

        if (!getCurrentConversation()) {
          await createNewConversation(submittedText.slice(0, 30) + '...');
        }

        if (currentSearchSuggestions.length > 0) {
          addMessageToCurrentConversation({
            role: 'system',
            content: getContextFromSelectedIndexedWebsites(),
          });
        }
        console.log('STARTING adding question from user to conversion');

        addMessageToCurrentConversation({
          role: 'user',
          content: submittedText,
        });

        ollamaService.requestLlamaStream(
          getCurrentConversation()?.messages || [],
          (chunk) => {
            responseContent += chunk.message.content;
            if (chunk.done === false) {
              setStreamedResponse((prev) => prev + chunk.message.content);
              setIsLoading(false);
            } else {
              setIsStreamingFinished(true);
              setIsAIWorking(false);
              setIsLoading(false);
              addMessageToCurrentConversation({
                role: 'assistant',
                content: responseContent,
              });
            }
          },
          (error) => {
            console.log('STOPED adding partial response to conversion');
            addMessageToCurrentConversation({
              role: 'assistant',
              content: responseContent,
            });
            if (error.name !== 'AbortError') {
              setError('Something went wrong...');
            }
            setIsLoading(false);
            setIsStreamingFinished(true);
            setIsAIWorking(false);
          },
        );
      }, 100);
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
    <div id="container" className={cn(' ')}>
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
