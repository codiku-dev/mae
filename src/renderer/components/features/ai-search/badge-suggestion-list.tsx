import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/renderer/components/ui/tooltip';
import { X } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface Link {
  id: string;
  suggestion: string;
  link: string;
}

interface BadgeSelectedSuggestionProps {
  linksToLearnFrom: Link[];
  removeLink: (id: string) => void;
  formatLinkForDisplay: (link: string) => string;
}

const BadgeSuggestionList: React.FC<BadgeSelectedSuggestionProps> = ({
  linksToLearnFrom,
  removeLink,
  formatLinkForDisplay,
}) => {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {linksToLearnFrom.map((link) => (
        <TooltipProvider key={link.id}>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="inline-block">
                <Badge className="pr-1 flex items-center cursor-pointer">
                  <span>
                    {link.suggestion.toUpperCase()}{' '}
                    {formatLinkForDisplay(link.link)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLink(link.id);
                    }}
                    className="ml-1 text-xs hover:text-red-500 focus:outline-none"
                    aria-label="Remove link"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.link}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export { BadgeSuggestionList };
