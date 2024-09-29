import { useRef, useEffect, useState } from "react";
import { useConversations } from "../../../../hooks/use-conversations";
import { LLMConversationHistory, LLMMessage } from "@/main/services/ollama/ollama-type";
import { UserMessage } from "./user-message";
import { AIMessage } from "./ai-message";

import { cn } from "@/renderer/libs/utils";
import { Toolbar } from "../toolbar/toolbar";
import { Button } from "@/renderer/components/ui/button"; // Add this import

export function Conversation(p: { onClickNewConversation: () => void, currentStreamedResponse: string, isStreamFinished: boolean, isLoading: boolean, onClickConversationItem: () => void }) {

    const { getCurrentConversation } = useConversations();
    const currentConversation = getCurrentConversation() as LLMConversationHistory;

    const scrollRef = useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = useState(true);
    const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [lastHeight, setLastHeight] = useState(0);

    const [lastHeightChangeTime, setLastHeightChangeTime] = useState(Date.now());
    const [prevIsStreamFinished, setPrevIsStreamFinished] = useState(false);

    useEffect(() => {
        if (autoScroll && scrollRef.current) {
            const currentHeight = scrollRef.current.scrollHeight;
            const currentTime = Date.now();

            if (currentHeight !== lastHeight) {
                setLastHeight(currentHeight);
                setLastHeightChangeTime(currentTime);
                scrollRef.current.scrollTop = currentHeight;
            } else if (currentTime - lastHeightChangeTime < 3000) {
                scrollRef.current.scrollTop = currentHeight;
            }
        }

        // Add this new condition
        if (!prevIsStreamFinished && p.isStreamFinished) {
            scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
        setPrevIsStreamFinished(p.isStreamFinished);
    }, [currentConversation, p.currentStreamedResponse, autoScroll, lastHeight, lastHeightChangeTime, p.isStreamFinished, prevIsStreamFinished]);

    // handle auto scroll to bottom and stop (3sec) when user scroll and after 3 sec of height not changing we stop
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
            // Show scroll to top button when not at the top
            setShowScrollToTop(scrollTop > 100);

            if (!isScrolledToBottom) {
                setAutoScroll(false);
                if (autoScrollTimeoutRef.current) {
                    clearTimeout(autoScrollTimeoutRef.current);
                }
                autoScrollTimeoutRef.current = setTimeout(() => {
                    setAutoScroll(true);
                }, 3000);
            }
        }
    };

    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const displayAiMessage = (message: LLMMessage, index: number) => {
        // if last message
        if (index === currentConversation?.messages.length - 1 && !p.isStreamFinished) {
            return null
        } else {
            return <AIMessage message={message.content} isStreamFinished />
        }
    }
    console.log(p.currentStreamedResponse, " is finished ? ", p.isStreamFinished, " is loading ? ", p.isLoading)
    return (
        <div
            ref={scrollRef}
            className="h-[700px] overflow-y-auto relative" // Added 'relative'
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onScroll={handleScroll}
        >
            <Toolbar onClickNewConversation={p.onClickNewConversation} onClickConversationItem={p.onClickConversationItem} />
            <div
                className="flex flex-col "
            >
                {currentConversation?.messages.map((message, index) => {
                    return <div key={index} className="" >
                        {message.role === "user" ?
                            <div className={cn(index > 0 && "mt-8")}><UserMessage message={message.content} /></div> :
                            displayAiMessage(message, index)
                        }
                    </div>
                })}

                {p.currentStreamedResponse && !p.isStreamFinished && <AIMessage message={p.currentStreamedResponse} isLoading={p.isLoading} isStreamFinished={p.isStreamFinished} />}
            </div>

            {showScrollToTop && (
                <Button
                    className="fixed bottom-4 right-4 rounded-full p-2  size-8 border-2 bg-white text-primary hover:text-white "
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    ↑
                </Button>
            )}
        </div>
    );
}