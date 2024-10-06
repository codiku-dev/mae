import { Error } from '@/renderer/components/features/ai-chat/conversation/error';
import { useAppStore } from '@/renderer/hooks/use-app-store';
import { useConversations } from '@/renderer/hooks/use-conversations';
import { useSearch } from '@/renderer/hooks/use-search';
import { useSettings } from '@/renderer/hooks/use-settings';
import { ollamaService } from '@/renderer/services/ollama/ollama.service';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Conversation } from './conversation/conversation';
import { SUGGESTION_OPTIONS_ID, Searchbar } from './searchbar/searchbar';
import { Toolbar } from './toolbar/toolbar';

export function AiChat() {
  const [streamedResponse, setStreamedResponse] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const { isDialogOpen } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    createNewConversation,
    addMessageToCurrentConversation,
    getCurrentConversation,
    getCurrentConversationMessages,
    setCurrentConversationTitle,
  } = useConversations();
  const currentConversation = getCurrentConversation();
  const hasMsgInCurrentConv =
    currentConversation?.messages && currentConversation?.messages.length > 0;
  const {
    currentSearchSuggestions,
    isLoading,
    inputValue,
    error,
    isStreamingFinished,
    setInputValue,
    setIsStreamingFinished,
    setIsLoading,
    setError,
  } = useSearch();
  const { getCurrentModel } = useSettings();

  const clearSearch = async () => {
    await ollamaService.abortAllRequests();
    setInputValue('');
    setError('');
    setIsLoading(false);
    setIsStreamingFinished(true);
  };

  const stopAndResetAll = async () => {
    setStreamedResponse('');
    await clearSearch();
  };

  const handleStopStream = async () => {
    await clearSearch();
  };

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(
      'on-searchbar-visibilty-change',
      isVisible,
    );
  }, [isVisible]);

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
      if (!isDialogOpen && e.key === 'Escape') {
        setIsVisible(false);
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isDialogOpen]);

  const newConversation = () => {
    stopAndResetAll();
    inputRef.current?.focus();
    setStreamedResponse('');
    setTimeout(() => {
      createNewConversation('');
    }, 200);
  };


  async function generateTitleForConversation(userMessage: string) {
    const title = await ollamaService.generateTitleForConversation(getCurrentModel().id, userMessage)
    setCurrentConversationTitle(title.slice(0, 30) + '...')
  }
  const handleSubmit = async (submittedText: string) => {
    let responseContent = '';
    let context = '';
    let documentationContext = '';
    await stopAndResetAll();
    // remove all @docs and @web from submittedText
    submittedText = submittedText.replace(/@(docs|web)/g, '');
    setStreamedResponse('');
    setIsLoading(true);
    setIsStreamingFinished(false);
    setInputValue('');
    setError('');
    if (!currentConversation) {
      await createNewConversation(submittedText.slice(0, 30) + '...');

    }
    if (currentConversation?.title === '') {
      generateTitleForConversation(submittedText);
    }

    if (currentSearchSuggestions.length > 0) {
      if (currentSearchSuggestions[0].id === SUGGESTION_OPTIONS_ID.SEARCH_WEB) {
        documentationContext = await window.electron.ipcRenderer.invoke(
          'search-doc-in-memory',
          submittedText,
        );
      } else {
        documentationContext = await window.electron.ipcRenderer.invoke(
          'find-vector-doc',
          submittedText,
        );
      }

      context = `Answer the question based on the documentation provided. 
            if code is askedinclude the imports in answer. 
            if code is asked provide full code.
            if code is asked use the right programming language.
            Provide code only if necessary.
            Context: ${documentationContext}
            `;
    }
    addMessageToCurrentConversation({
      role: 'user',
      content: submittedText,
    });
    ollamaService.requestLlamaStream(
      getCurrentModel()?.id,
      getCurrentConversationMessages() || [],
      context,
      (chunk) => {
        responseContent += chunk.message.content;
        if (chunk.done === false) {
          setStreamedResponse((prev) => prev + chunk.message.content);
          setIsLoading(false);
        } else {
          setIsStreamingFinished(true);
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
      },
    );
  };

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
            <div className="flex flex-col">
              <div className="px-4 pt-4 ">
                <Searchbar
                  ref={inputRef}
                  value={inputValue}
                  isStreamingFinished={isStreamingFinished}
                  onChange={setInputValue}
                  onSubmit={handleSubmit}
                  onClickStop={handleStopStream}
                />
                <Toolbar
                  onClickNewConversation={newConversation}
                  onClickConversationItem={stopAndResetAll}
                />
              </div>
              <div className="p-4">
                {hasMsgInCurrentConv && (
                  <Conversation
                    onClickNewConversation={newConversation}
                    isStreamFinished={isStreamingFinished}
                    currentStreamedResponse={streamedResponse}
                    isLoading={isLoading}
                  />
                )}
                {error && error !== '' && <Error errorMessage={error} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
