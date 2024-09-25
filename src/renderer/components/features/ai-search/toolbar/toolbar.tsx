import { ListRestart, Plus, LucideIcon } from "lucide-react";
import { ButtonTooltipIcon } from "./button-tooltip-icon";


export function Toolbar(p: { onClickNewConversation: () => void }) {
    return (
        <div className="flex justify-end h-6">
            <ButtonTooltipIcon
                id="ai-previous-conversation-button"
                onClick={p.onClickNewConversation}
                icon={ListRestart}
                tooltipContent="Previous chat"
            />
            <ButtonTooltipIcon
                id="ai-new-conversation-button"
                onClick={p.onClickNewConversation}
                icon={Plus}
                tooltipContent="Start new conversation"
            />
        </div>
    );
}