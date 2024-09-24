import { ollamaService } from '@/main/services/ollama/ollama.service';
import { Error } from '@/renderer/components/features/ai-search/error';
import { RichResponse } from '@/renderer/components/features/ai-search/rich-response';
import { Button } from '@/renderer/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAppStore } from '../hooks/use-app-store';
import { SUGGESTION_OPTIONS_ID, Searchbar } from '../components/features/ai-search/searchbar/searchbar';
import { logToMain } from '../libs/utils';

export function HomePage() {
  const [value, setValue] = useState<string>('');
  const [streamedResponse, setStreamedResponse] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStreamingFinished, setIsStreamingFinished] = useState(true);
  const [submitedPrompt, setSubmitedPrompt] = useState('');
  const [error, setError] = useState('');
  const [isAIWorking, setIsAIWorking] = useState(false);
  const { currentSearchSuggestions, isDialogLinkInputOpen } =
    useAppStore();
  const {
    addMessageToCurrentConversation,
    getCurrentConversation,
    createNewConversation,
  } = useAppStore();

  const stopAndResetAll = () => {
    console.log('stopAndResetAll');
    ollamaService.abortAllRequests();
    setStreamedResponse('');
    setValue('');
    setError('');
    setIsLoading(false);
    setIsStreamingFinished(true);
    setIsAIWorking(false);
  };

  const handleStopStream = () => {
    console.log('handleStopStream');
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

  logToMain(`isDialogLinkInputOpen  ${isDialogLinkInputOpen}`)

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

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isDialogLinkInputOpen && e.key === 'Escape') {
        setIsVisible(false);
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isDialogLinkInputOpen]);


  const handleSubmit = async (submittedText: string) => {
    stopAndResetAll();
    // remove all @docs and @web from submittedText
    submittedText = submittedText.replace(/@docs/g, '');
    submittedText = submittedText.replace(/@web/g, '');
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
      console.log("CURRENT SUGGESTION IN SUBMIT", currentSearchSuggestions[0].id)

      let context = ""
      if (currentSearchSuggestions[0].id === SUGGESTION_OPTIONS_ID.SEARCH_WEB) {
        context = await window.electron.ipcRenderer.invoke(
          'search-doc-in-memory',
          submittedText,
        );
      } else {
        context = await window.electron.ipcRenderer.invoke(
          'langchain-find-relevant-document',
          submittedText,
        );
      }
      console.log("context found====>", context)
      addMessageToCurrentConversation({
        role: 'user',
        content: `Answer the question based on the documentation provided. 
          if code is askedinclude the imports in answer. 
          if code is asked provide full code.
          if code is asked use the right programming language.
          Provide code only if necessary.
          Context: ${context}
          Question: ${submittedText}`,
      });
    } else {
      addMessageToCurrentConversation({
        role: 'user',
        content: submittedText,
      });
    }
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
        addMessageToCurrentConversation({
          role: 'assistant',
          content: responseContent,
        });
        if (error.name !== 'AbortError') {
          console.log('ERROR aborted...');
        } else {
          console.log('ERROR', error);
        }
        setIsLoading(false);
        setIsStreamingFinished(true);
        setIsAIWorking(false);
      },
    );
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

  const onClosed = () => {
    setTimeout(() => {
      window.electron.ipcRenderer.sendMessage('request-close-window');
    }, 100);
  };

  const onOpen = () => {
    setTimeout(() => {
      window.electron.ipcRenderer.sendMessage('request-focus-window');
    }, 100);
  };

  return (
    <div id="container">
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
                onClosed();
              } else {
                onOpen();
              }
            }}
          >
            <div className="w-screen">
              <div className="flex flex-col  items-center ">
                <div id="ai-searchbar" className="w-[420px]">
                  <Searchbar
                    value={value}
                    isStreamingFinished={isStreamingFinished}
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
