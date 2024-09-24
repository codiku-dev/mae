import { useRef, useEffect, useState } from "react";
import { useConversations } from "../../../../hooks/use-conversations";
import { LLMConversationHistory, LLMMessage } from "@/main/services/ollama/ollama-type";
import { UserHistoryMessage } from "./user-history-message";
import { AIHistoryMessage } from "./ai-history-message";
import {
    codeBlockLookBack,
    findCompleteCodeBlock,
    findPartialCodeBlock,
} from '@llm-ui/code';
import { markdownLookBack } from '@llm-ui/markdown';
//@ts-ignore
import { useLLMOutput } from '@llm-ui/react';
import { CodeRenderer } from '../../../ui/code-renderer';
import { MarkdownRenderer } from '../../../ui/markdown-renderer';
//@ts-ignore
import { throttleBasic } from '@llm-ui/react';

import { Skeleton } from '../../../ui/skeleton';
export function Conversation(p: { currentStreamedResponse: string, isStreamFinished: boolean, isLoading: boolean }) {
    const throttle = throttleBasic({
        readAheadChars: 10,
        targetBufferChars: 7,
        adjustPercentage: 0.35,
        frameLookBackMs: 1000,
        windowLookBackMs: 1000,
    });
    const { blockMatches } = useLLMOutput({
        throttle,
        llmOutput: p.currentStreamedResponse,
        fallbackBlock: {
            component: (p: any) => <MarkdownRenderer markdownText={p.blockMatch.output} />,
            lookBack: markdownLookBack(),
        },
        blocks: [
            {
                component: CodeRenderer,
                findCompleteMatch: findCompleteCodeBlock(),
                findPartialMatch: findPartialCodeBlock(),
                lookBack: codeBlockLookBack(),
            },
        ],
        isStreamFinished: p.isStreamFinished,
    });

    const [userHasScrolled, setUserHasScrolled] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const { getCurrentConversation } = useConversations();
    const currentConversation = getCurrentConversation() as LLMConversationHistory;

    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight; // 10px threshold
                setUserHasScrolled(!isAtBottom);

                // Clear any existing timeout
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }

                // Set a new timeout
                scrollTimeoutRef.current = setTimeout(() => {
                    setUserHasScrolled(false);
                }, 3000);
            }
        };

        scrollRef.current?.addEventListener('scroll', handleScroll);
        return () => {
            scrollRef.current?.removeEventListener('scroll', handleScroll);
            // Clear timeout on cleanup
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!userHasScrolled && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentConversation?.messages.length]);

    const displayAiMessage = (message: LLMMessage, index: number) => {
        // if last message
        if (index === currentConversation?.messages.length - 1 && p.isStreamFinished) {
            return null
        } else {
            return <AIHistoryMessage message={message.content} />
        }

    }

    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            className="interactive mt-4 p-4 rounded-md bg-white animate-in flex flex-col gap-4 relative w-full shadow-xl"
        >
            <div
                ref={scrollRef}
                className="flex flex-col gap-12 max-h-[500px] overflow-y-auto py-2"
            >
                {currentConversation && currentConversation?.messages.map((message, index) => {
                    return <div key={index} >
                        {message.role === "user" ?
                            <UserHistoryMessage message={message.content} /> :
                            displayAiMessage(message, index)
                        }
                    </div>
                })}

                <AIHistoryMessage message={p.currentStreamedResponse} isLoading={p.isLoading} />
            </div>
        </div>
    );
}