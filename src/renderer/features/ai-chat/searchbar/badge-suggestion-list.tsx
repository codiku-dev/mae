import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/renderer/ui/tooltip';
import { X } from 'lucide-react';
import { Badge } from '@/renderer/ui/badge';
import { LoadingSpinner } from '@/renderer/ui/loading-spinner';
import { SUGGESTION_OPTIONS_ID } from '@/renderer/features/ai-chat/searchbar/searchbar';
import { SearchSuggestion, useSearch } from '@/renderer/hooks/use-search';

interface Link {
  id: string;
  suggestion: string;
  link: string;
}

interface Props {
  isLoading: boolean;
  currentSuggestion: SearchSuggestion;
  onRemoveLink: (id: string) => void;
}

const BadgeSuggestionList = (p: Props) => {
  const { currentSearchSuggestions, getCommands } =
    useSearch();

  const removeLink = (id: string) => {
    p.onRemoveLink(id);
  };

  const formatLinkForDisplay = (link: string) => {
    return link.replace(/^(https?:\/\/)?(www\.)?/, '').slice(0, 10) + '...';
  };
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {currentSearchSuggestions.map(suggestion => {
        const command = getCommands().find(command => command.url === suggestion.link);
        return (
          <TooltipProvider key={suggestion.id}>
            <Tooltip delayDuration={200}>
              <TooltipTrigger asChild>
                <div className="inline-block">
                  <Badge
                    id={'ai-badge-' + suggestion.link}
                    className="border-sky-100 shadow-lg h-6 interactive pr-1 flex items-center cursor-pointer"
                  >

                    <span>
                      {p.isLoading ? <span className='flex justify-between'>{p.currentSuggestion.id === SUGGESTION_OPTIONS_ID.ADD_DOC ? "Learning" : "Fetching"} from {formatLinkForDisplay(suggestion.link)}<LoadingSpinner /></span> :
                        <>
                          Using{" "}
                          {command ? getCommands().find(command => command.url === suggestion.link)?.command : formatLinkForDisplay(suggestion.link)}
                        </>
                      }
                    </span>

                    {!p.isLoading && <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLink(suggestion.id);
                      }}
                      className="ml-1 text-xs hover:text-red-500 focus:outline-none"
                      aria-label="Remove link"
                    >
                      <X size={12} />
                    </button>}
                  </Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{suggestion.link}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}


    </div>
  );
};

export { BadgeSuggestionList };
