import { ollamaService } from '@/main/services/ollama/ollama.service';
import { Error } from '@/renderer/components/features/ai-search/error';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../../hooks/use-app-store';
import { SUGGESTION_OPTIONS_ID, Searchbar } from '../../../components/features/ai-search/searchbar/searchbar';
import { useConversations } from '@/renderer/hooks/use-conversations';
import { useSearch } from '@/renderer/hooks/use-search';
import { Conversation } from './conversation/conversation';
import { error } from 'console';

export function AiSearch() {
    const [value, setValue] = useState<string>('');
    const [streamedResponse, setStreamedResponse] = useState<string>('');
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isStreamingFinished, setIsStreamingFinished] = useState(true);
    const [error, setError] = useState('');
    const [isAIWorking, setIsAIWorking] = useState(false);
    const { isDialogOpen } = useAppStore();
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        createNewConversation,
        addMessageToCurrentConversation,
        getCurrentConversation,
        getCurrentConversationMessages,
        setCurrentConversationTitle,
    } = useConversations();
    const currentConversation = getCurrentConversation()
    const hasMsgInCurrentConv = currentConversation?.messages && currentConversation?.messages.length > 0
    const { currentSearchSuggestions } = useSearch();


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
        setStreamedResponse("")
        setTimeout(() => {
            createNewConversation("");
        }, 200)


    };
    const handleSubmit = async (submittedText: string) => {
        stopAndResetAll();
        // remove all @docs and @web from submittedText
        submittedText = submittedText.replace(/@docs/g, '');
        submittedText = submittedText.replace(/@web/g, '');
        let responseContent = '';
        setIsAIWorking(true);
        setStreamedResponse('');
        setIsLoading(true);
        setIsStreamingFinished(false);
        setValue('');
        setError('');

        if (!currentConversation) {
            await createNewConversation(submittedText.slice(0, 30) + '...');
        } else if (currentConversation.title === "") {
            setCurrentConversationTitle(submittedText.slice(0, 30) + '...');
        }
        let context = ""
        let documentationContext = ""
        if (currentSearchSuggestions.length > 0) {
            if (currentSearchSuggestions[0].id === SUGGESTION_OPTIONS_ID.SEARCH_WEB) {
                documentationContext = await window.electron.ipcRenderer.invoke(
                    'search-doc-in-memory',
                    submittedText,
                );
            } else {
                documentationContext = await window.electron.ipcRenderer.invoke(
                    'langchain-find-relevant-document',
                    submittedText,
                );
            }

            context = `Answer the question based on the documentation provided. 
            if code is askedinclude the imports in answer. 
            if code is asked provide full code.
            if code is asked use the right programming language.
            Provide code only if necessary.
            Context: ${documentationContext}
            `

        }
        addMessageToCurrentConversation({
            role: 'user',
            content: submittedText,
        });
        ollamaService.requestLlamaStream(
            getCurrentConversationMessages() || [],
            context,
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


    const onClosed = () => {
        setTimeout(() => {
            window.electron.ipcRenderer.sendMessage('request-close-window');
        }, 100);
        window.electron.ipcRenderer.sendMessage('set-ignore-mouse-events', false);
    };

    const onOpen = () => {
        setTimeout(() => {
            window.electron.ipcRenderer.sendMessage('request-focus-window');
        }, 100);
    };


    return (
        <div id="container" className='w-full bg-transparent '>

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
                        <div className="flex flex-col  h-[800px] overflow-y-hidden ">
                            <div id="ai-searchbar" className=" px-4 py-4">
                                <Searchbar
                                    ref={inputRef}
                                    value={value}
                                    isStreamingFinished={isStreamingFinished}
                                    onChange={setValue}
                                    onSubmit={handleSubmit}
                                    isLoading={isAIWorking}
                                    onClickStop={handleStopStream}
                                />
                            </div>
                            <div id="ai-response" className="interactive py-4 px-4">

                                {hasMsgInCurrentConv && <Conversation onClickConversationItem={stopAndResetAll} onClickNewConversation={newConversation} isStreamFinished={isStreamingFinished} currentStreamedResponse={streamedResponse} isLoading={isLoading} />}

                                {error && <Error errorMessage={error} />}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
