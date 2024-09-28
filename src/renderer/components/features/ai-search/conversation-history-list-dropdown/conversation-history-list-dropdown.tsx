import React, { useState, useEffect } from 'react';
import { ListRestart, Search } from 'lucide-react';
import { Button } from "../../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Input } from "../../../ui/input";
import { useConversations } from '@/renderer/hooks/use-conversations';
import { ButtonTooltipIcon } from '../toolbar/button-tooltip-icon';
import { formatTimeAgo } from '@/renderer/libs/utils';

export const ConversationHistoryListDropdown = (p: { onClickConversationItem: () => void }) => {
    const { conversationHistory, currentConversationId, setCurrentConversationId } = useConversations();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredConversations, setFilteredConversations] = useState(conversationHistory);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const filtered = conversationHistory.filter((conversation) =>
            conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredConversations(filtered);
    }, [searchTerm, conversationHistory.length]);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger>
                <ButtonTooltipIcon
                    onClick={() => {
                        setIsOpen(true)
                    }}
                    icon={ListRestart}
                    tooltipContent="Conversations"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96">
                <div onBlur={() => setIsOpen(false)}>
                    <div className="p-2 interactive">
                        <div className="  flex items-center space-x-2">
                            <Search className="absolute left-8 w-4 h-4 opacity-50" />
                            <Input
                                onClick={(e) => {
                                    console.log("STOP PROPAGATION INPUT")
                                    e.stopPropagation()
                                }}
                                autoFocus

                                placeholder="Search conversations"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 h-8 w-full"
                            />
                        </div>
                    </div>
                    <div id="ai-conversation-history-list-dropdown-content" className=" mt-2 max-h-[500px] overflow-y-auto">
                        {filteredConversations.map((conversation) => (
                            <div key={conversation.id} className="flex flex-col px-2 py-1">
                                <span className="text-xs text-gray-500 mb-1">
                                    {formatTimeAgo(conversation.createdAt)}
                                </span>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentConversationId(conversation.id);
                                        setIsOpen(false);
                                        p.onClickConversationItem()
                                    }}
                                    variant="ghost"
                                    className={`w-full justify-start ${currentConversationId === conversation.id && ' bg-primary-foreground'}`}
                                >
                                    {conversation.title}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
