import { Plus } from "lucide-react";
import { ButtonTooltipIcon } from "./button-tooltip-icon";
import { ConversationHistoryListDropdown } from "../conversation-history-list-dropdown/conversation-history-list-dropdown";


export function Toolbar(p: { onClickNewConversation: () => void, onClickConversationItem: () => void }) {


    return (
        <div className="fixed right-5 z-10   rounded-lg bg-white shadow-md">
            <ConversationHistoryListDropdown onClickConversationItem={p.onClickConversationItem} />
            <ButtonTooltipIcon
                onClick={p.onClickNewConversation}
                icon={Plus}
                tooltipContent="Start new conversation"
            />
        </div>
    );
}