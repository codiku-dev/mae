import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/renderer/components/ui/tooltip';
import { X } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { useAppStore } from '@/renderer/hooks/use-app-store';

interface Link {
  id: string;
  suggestion: string;
  link: string;
}

interface BadgeSelectedSuggestionProps {}

const BadgeSuggestionList: React.FC<BadgeSelectedSuggestionProps> = () => {
  const { currentSearchSuggestions, setCurrentSearchSuggestions } =
    useAppStore();
  const removeLink = (id: string) => {
    setCurrentSearchSuggestions(
      currentSearchSuggestions.filter((link) => link.id !== id),
    );
  };

  const formatLinkForDisplay = (link: string) => {
    return link.replace(/^(https?:\/\/)?(www\.)?/, '').slice(0, 10) + '...';
  };
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {currentSearchSuggestions.map((suggestion) => (
        <TooltipProvider key={suggestion.id}>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="inline-block">
                <Badge className="pr-1 flex items-center cursor-pointer">
                  <span>
                    {suggestion.suggestion.toUpperCase()}{' '}
                    {formatLinkForDisplay(suggestion.link)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLink(suggestion.id);
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
              <p>{suggestion.link}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export { BadgeSuggestionList };
