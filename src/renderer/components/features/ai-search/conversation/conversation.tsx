import { useRef, useEffect, useState } from "react";
import { useConversations } from "../../../../hooks/use-conversations";
import { LLMConversationHistory, LLMMessage } from "@/main/services/ollama/ollama-type";
import { UserMessage } from "./user-message";
import { AIMessage } from "./ai-message";

import { cn } from "@/renderer/libs/utils";
import { Button } from "@/renderer/components/ui/button";
import { Plus } from "lucide-react";

export function Conversation(p: { onClickNewConversation: () => void, currentStreamedResponse: string, isStreamFinished: boolean, isLoading: boolean }) {


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
            console.log("scroll to top ", scrollRef.current.scrollHeight)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentConversation?.messages.length, p.currentStreamedResponse]);

    const displayAiMessage = (message: LLMMessage, index: number) => {
        // if last message
        if (index === currentConversation?.messages.length - 1 && p.isStreamFinished) {
            return null
        } else {
            return <AIMessage message={message.content} />
        }

    }


    const newConversationButton = (
        <div className="flex justify-end h-6">

            <Button
                id="ai-clear-button"
                className="interactive text-xs text-gray-400"
                onClick={p.onClickNewConversation}
                size="sm"
                variant={'ghost'}

            >
                <Plus className=" mr-2" size={12} />
                New conversation
            </Button>

        </div>
    );

    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            className="interactive mt-4 p-4 rounded-md bg-white animate-in flex flex-col gap-4 relative w-full shadow-xl"
        >
            {newConversationButton}
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

                {p.currentStreamedResponse && <AIMessage message={p.currentStreamedResponse} isLoading={p.isLoading} />}
            </div>
        </div>
    );
}