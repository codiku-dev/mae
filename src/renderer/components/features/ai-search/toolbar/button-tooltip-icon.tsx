import { LucideIcon } from "lucide-react";
import { Button } from "../../../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";


interface ButtonTooltipIconProps {
    onClick: () => void;
    icon: LucideIcon;
    tooltipContent: string;
}

export function ButtonTooltipIcon({ onClick, icon: Icon, tooltipContent }: ButtonTooltipIconProps) {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button

                        className=" text-xs text-gray-300"
                        onClick={onClick}
                        size="sm"
                        variant={'ghost'}
                    >
                        <Icon size={18} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {tooltipContent}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}