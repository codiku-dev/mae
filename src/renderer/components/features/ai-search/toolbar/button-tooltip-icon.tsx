import { LucideIcon } from "lucide-react";
import { Button } from "../../../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";


interface ButtonTooltipIconProps {
    id: string;
    onClick: () => void;
    icon: LucideIcon;
    tooltipContent: string;
}

export function ButtonTooltipIcon({ id, onClick, icon: Icon, tooltipContent }: ButtonTooltipIconProps) {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        id={id}
                        className="interactive text-xs text-gray-400"
                        onClick={onClick}
                        size="sm"
                        variant={'ghost'}
                    >
                        <Icon className="mr-2" size={18} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {tooltipContent}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}