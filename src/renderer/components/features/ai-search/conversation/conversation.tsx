import { useRef } from "react";
import { useConversations } from "../../../../hooks/use-conversations";
import { LLMConversationHistory } from "@/main/services/ollama/ollama-type";
import { UserHistoryMessage } from "./user-history-message";
import { AIHistoryMessage } from "./ai-history-message";

export function Conversation(p: {}) {
    const { getCurrentConversation } = useConversations();
    const currentConversation = getCurrentConversation() as LLMConversationHistory;

    const scrollRef = useRef<HTMLDivElement>(null);

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
                className="flex flex-col gap-4 max-h-[500px] overflow-y-auto py-2"
            >
                {currentConversation.messages.map((message, index) => (
                    <div key={index}>
                        {message.role === "user" ? <UserHistoryMessage message={message} /> : <AIHistoryMessage message={message} />}
                    </div>
                ))}
            </div>
        </div>
    );
}