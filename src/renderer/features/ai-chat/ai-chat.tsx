import { Error } from '@/renderer/features/ai-chat/conversation/error';
import { useConversations } from '@/renderer/hooks/use-conversations';
import { useSearch } from '@/renderer/hooks/use-search';
import { useSettings } from '@/renderer/hooks/use-settings';
import { ollamaService, } from '@/renderer/services/ollama/ollama.service';
import { useRef, useState } from 'react';
import { Conversation } from '@/renderer/features/ai-chat/conversation/conversation';
import { SUGGESTION_OPTIONS_ID, Searchbar } from '@/renderer/features/ai-chat/searchbar/searchbar';
import { Toolbar } from '@/renderer/features/ai-chat/toolbar/toolbar';
import { DocVectorStoreAPI } from '@/main/modules/doc-vector-store/doc-vector-store-api';

export function AiChat() {
  const [streamedResponse, setStreamedResponse] = useState<string>('');
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
        documentationContext = await DocVectorStoreAPI.findDocInMemory(
          submittedText,
        );
      } else {
        documentationContext = await DocVectorStoreAPI.findDoc(
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
  return (

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

  );
}
