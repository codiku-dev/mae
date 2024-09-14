import React, { forwardRef } from 'react';
import { Badge } from '@/renderer/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/renderer/components/ui/dropdown-menu';
import { SearchSuggestion } from '@/renderer/hooks/use-app-store';

interface SearchSuggestionsProps {
  show: boolean;
  onSelect: (suggestion: SearchSuggestion) => void;
}

const suggestions: SearchSuggestion[] = ['docs', 'web'];

export const SearchSuggestions = forwardRef<
  HTMLButtonElement,
  SearchSuggestionsProps
>(({ show, onSelect }, ref) => {
  return suggestions.map((suggestion) => (
    <DropdownMenuItem key={suggestion} onSelect={() => onSelect(suggestion)}>
      <Badge>{suggestion}</Badge>
    </DropdownMenuItem>
  ));
});

SearchSuggestions.displayName = 'SearchSuggestions';
