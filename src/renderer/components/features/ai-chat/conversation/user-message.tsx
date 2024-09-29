import { useAppStore } from "@/renderer/hooks/use-app-store";
import { useState } from "react";

export function UserMessage(p: { message: string }) {
    const { userName } = useAppStore();
    return (
        <div className="flex flex-col gap-2 max-w-[80%] ">
            <div className="flex items-center gap-2 mb-1 ">
                <div className="bg-white/70 size-8 rounded-full text-lg text-gray-600 flex items-center justify-center shadow-md">
                    {userName ? userName[0].toUpperCase() : 'U'}
                </div>
                <span className="text-sm text-white/70">{userName || 'User'}</span>
            </div>
            <div className="bg-white/70 p-3 rounded-lg rounded-tl-none shadow-md">
                <p>{p.message}</p>
            </div>
        </div>
    );
}