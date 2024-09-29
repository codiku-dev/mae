import { Plus } from "lucide-react";
import { ConversationHistoryListDropdown } from "../conversation-history-list-dropdown/conversation-history-list-dropdown";
import { Button } from "@/renderer/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/renderer/components/ui/tooltip";


export function Toolbar(p: { onClickNewConversation: () => void, onClickConversationItem: () => void }) {


    return (
        <div className="fixed right-5 z-10   rounded-lg bg-white shadow-md">
            <ConversationHistoryListDropdown onClickConversationItem={p.onClickConversationItem} />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className=" text-xs text-secondary"
                        size="sm"
                        variant={'ghost'}
                        onClick={p.onClickNewConversation}
                    >
                        <Plus size={18} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Start new conversation</TooltipContent>
            </Tooltip>
        </div>
    );
}