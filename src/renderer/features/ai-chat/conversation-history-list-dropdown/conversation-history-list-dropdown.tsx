import { useState } from 'react';
import { ListRestart, Search, Trash2 } from 'lucide-react';
import { Button } from "@/renderer/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/renderer/ui/dropdown-menu";
import { Input } from "@/renderer/ui/input";
import { useConversations } from '@/renderer/hooks/use-conversations';
import { formatTimeAgo } from '@/renderer/libs/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/renderer/ui/tooltip';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/renderer/ui/alert-dialog";

export const ConversationHistoryListDropdown = (p: { onClickConversationItem: () => void }) => {
    const { conversationHistory, currentConversationId, setCurrentConversationId, deleteConversation } = useConversations();
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);

    const filteredConversations = conversationHistory.filter((conversation) =>
        conversation.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (e: React.MouseEvent, conversationId: string) => {
        e.stopPropagation();
        setConversationToDelete(conversationId);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (conversationToDelete) {
            deleteConversation(conversationToDelete);
            setDialogOpen(false);
            setConversationToDelete(null);
        }
    };

    return (
        <>
            <Tooltip>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <TooltipTrigger asChild>

                        <DropdownMenuTrigger asChild>
                            <Button
                                className=" text-xs text-secondary"
                                size="sm"
                                variant={"outline"}
                            >
                                <ListRestart size={18} />
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>


                    <DropdownMenuContent className="w-96 mr-5">
                        <div onBlur={() => setIsOpen(false)}>
                            <div className="p-2 interactive">
                                <div className="  flex items-center space-x-2">
                                    <Search className="absolute left-8 w-4 h-4 opacity-50" />
                                    <Input
                                        onClick={(e) => {
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
                            <div className=" mt-2 max-h-[500px] overflow-y-auto">
                                {filteredConversations.map((conversation) => (
                                    <div key={conversation.id} className="flex flex-col px-2 py-1">
                                        <span className="text-xs text-gray-500 mb-1">
                                            {formatTimeAgo(conversation.createdAt)}
                                        </span>
                                        <div className="flex items-center">
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentConversationId(conversation.id);
                                                    setIsOpen(false);
                                                    p.onClickConversationItem()
                                                }}
                                                variant="ghost"
                                                className={`flex-grow justify-start ${currentConversationId === conversation.id && ' bg-primary-foreground'}`}
                                            >
                                                {conversation.title}
                                            </Button>
                                            <Button
                                                onClick={(e) => handleDeleteClick(e, conversation.id)}
                                                variant="ghost"
                                                size="icon"
                                                className="ml-2"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DropdownMenuContent>

                </DropdownMenu>
                <TooltipContent>Conversations history</TooltipContent>
            </Tooltip>

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to delete this conversation?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action is irreversible. The conversation will be permanently removed from the history.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
