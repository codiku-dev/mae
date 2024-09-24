import { LLMMessage } from "@/main/services/ollama/ollama-type";
import { useAppStore } from "@/renderer/hooks/use-app-store";
import { useState } from "react";

export function UserHistoryMessage(p: { message: LLMMessage }) {
    const { userName } = useAppStore();
    return (
        <div className="flex flex-col gap-2 max-w-[80%]">
            <div className="flex items-center gap-2 mb-1 ">
                <div className="bg-gray-200 size-8 rounded-full text-lg text-gray-600 flex items-center justify-center">
                    {userName ? userName[0].toUpperCase() : 'U'}
                </div>
                <span className="text-sm text-gray-500">{userName || 'User'}</span>
            </div>
            <div className="bg-gray-200 p-3 rounded-lg rounded-tl-none">
                <p>{p.message.content}</p>
            </div>
        </div>
    );
}