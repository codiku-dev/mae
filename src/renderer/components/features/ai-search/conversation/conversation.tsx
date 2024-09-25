import { useRef, useEffect, useState } from "react";
import { useConversations } from "../../../../hooks/use-conversations";
import { LLMConversationHistory, LLMMessage } from "@/main/services/ollama/ollama-type";
import { UserMessage } from "./user-message";
import { AIMessage } from "./ai-message";

import { cn } from "@/renderer/libs/utils";
import { Toolbar } from "../toolbar/toolbar";

export function Conversation(p: { onClickNewConversation: () => void, currentStreamedResponse: string, isStreamFinished: boolean, isLoading: boolean, onClickConversationItem: () => void }) {
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

                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }

                scrollTimeoutRef.current = setTimeout(() => {
                    setUserHasScrolled(false);
                }, 3000);
            }
        };

        scrollRef.current?.addEventListener('scroll', handleScroll);
        return () => {
            scrollRef.current?.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!userHasScrolled && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentConversation?.messages.length, p.currentStreamedResponse]);

    const displayAiMessage = (message: LLMMessage, index: number) => {
        // if last message
        if (index === currentConversation?.messages.length - 1 && !p.isStreamFinished) {
            return null
        } else {
            return <AIMessage message={message.content} />
        }
    }

    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            className="interactive mt-4 p-4 rounded-md bg-white animate-in flex flex-col gap-4 relative w-full shadow-2xl"
        >
            <Toolbar onClickNewConversation={p.onClickNewConversation} onClickConversationItem={p.onClickConversationItem} />
            <div
                ref={scrollRef}
                className="flex flex-col max-h-[500px] overflow-y-auto"
            >
                {currentConversation?.messages.map((message, index) => {
                    return <div key={index} className="" >
                        {message.role === "user" ?
                            <div className={cn(index > 0 && "mt-8")}><UserMessage message={message.content} /></div> :
                            displayAiMessage(message, index)
                        }
                    </div>
                })}

                {p.currentStreamedResponse && !p.isStreamFinished && <AIMessage message={p.currentStreamedResponse} isLoading={p.isLoading} />}
            </div>
        </div>
    );
}