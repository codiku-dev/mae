import { Plus } from "lucide-react";
import { ButtonTooltipIcon } from "./button-tooltip-icon";
import { ConversationHistoryListDropdown } from "../conversation-history-list-dropdown/conversation-history-list-dropdown";


export function Toolbar(p: { onClickNewConversation: () => void }) {


    return (
        <div className="flex justify-end h-6">
            <ConversationHistoryListDropdown />
            <ButtonTooltipIcon
                id="ai-new-conversation-button"
                onClick={p.onClickNewConversation}
                icon={Plus}
                tooltipContent="Start new conversation"
            />
        </div>
    );
}