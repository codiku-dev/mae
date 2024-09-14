import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PlaceholdersAndVanishInput } from '../../ui/placeholders-and-vanish-input';
import {
  SearchSuggestionTag,
  useAppStore,
} from '@/renderer/hooks/use-app-store';
import { v4 as uuidv4 } from 'uuid';
import { DialogLinkInput } from './dialog-link-input';

import { BadgeSuggestionList } from './badge-suggestion-list';
import { SuggestionAutoCompleter } from './suggestion-autocompleter';

// cmd + shift + P to toggle
const placeholders = [
  'Ask any question and press enter !',
  '⌘ + ⇧ + P to open and close',
];

const suggestions: SearchSuggestionTag[] = ['doc', 'web'];
export type SearchSuggestion = {
  id: string;
  suggestion: SearchSuggestionTag;
  link: string;
};
export function SearchBar(p: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading: boolean;
  onClickStop: () => void;
}) {
  const { currentSearchSuggestions, setCurrentSearchSuggestions } =
    useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] =
    useState<SearchSuggestionTag>();
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    SearchSuggestionTag[]
  >([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentSearchSuggestions.length]);

  useEffect(() => {
    if (!isDialogOpen) {
      inputRef.current?.focus();
    }
  }, [isDialogOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;
    p.onChange(newValue);

    const textBeforeCursor = newValue.slice(0, cursorPosition);
    const textAfterCursor = newValue.slice(cursorPosition);

    const wordsBeforeCursor = textBeforeCursor.split(/\s+/);
    const lastWordBeforeCursor =
      wordsBeforeCursor[wordsBeforeCursor.length - 1];

    const isTypingAtSymbol = lastWordBeforeCursor.includes('@');
    const hasSpaceAfterCursor = /^\s/.test(textAfterCursor);

    if (isTypingAtSymbol && (hasSpaceAfterCursor || textAfterCursor === '')) {
      const atSymbolIndex = lastWordBeforeCursor.lastIndexOf('@');
      const textAfterAtSymbol = lastWordBeforeCursor.slice(atSymbolIndex + 1);
      setShowSuggestions(true);

      // Update filtered suggestions
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(textAfterAtSymbol.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
      setSelectedSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      if (isDialogOpen) {
        handleDialogClose();
      } else if (showSuggestions) {
        setShowSuggestions(false);
      }
      return;
    }

    if (showSuggestions) {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
          );
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedSuggestionIndex((prev) =>
            prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredSuggestions.length > 0) {
            submitSuggestion(filteredSuggestions[selectedSuggestionIndex]);
          }
          break;
      }
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    p.onSubmit(p.value);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentSuggestion(undefined);
  };

  const handleDialogSubmit = (link: string) => {
    if (currentSuggestion) {
      // first add the "@suggestion" to the input
      setCurrentSearchSuggestions([
        ...currentSearchSuggestions,
        {
          id: uuidv4(),
          link,
          suggestion: currentSuggestion,
        },
      ]);
      // Remove any word starting with "@" from the input
      const newValue = p.value.replace(/@\S+\s?/, '').trim();
      p.onChange(newValue);
    }
    handleDialogClose();
  };

  const injectSuggestionInput = (pickedSuggestion: SearchSuggestionTag) => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const cursorPosition = inputElement.selectionStart || 0;
      const textBeforeCursor = p.value.slice(0, cursorPosition);
      const textAfterCursor = p.value.slice(cursorPosition);

      // Find the start of the current @mention
      const lastAtIndex = textBeforeCursor.lastIndexOf('@');
      const newTextBeforeCursor = textBeforeCursor.slice(0, lastAtIndex);

      // Construct the new value
      const newValue = `${newTextBeforeCursor}@${pickedSuggestion} ${textAfterCursor}`;
      p.onChange(newValue);

      // Set cursor position after the inserted suggestion
      setTimeout(() => {
        const newCursorPosition =
          newTextBeforeCursor.length + pickedSuggestion.length + 2; // +2 for @ and space
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
    }
  };

  const submitSuggestion = (pickedSuggestion: SearchSuggestionTag) => {
    setShowSuggestions(false);
    injectSuggestionInput(pickedSuggestion);
    setIsDialogOpen(true);
    setCurrentSuggestion(pickedSuggestion);
  };

  return (
    <div className="relative">
      <PlaceholdersAndVanishInput
        value={p.value}
        onChangeValue={p.onChange}
        onClickStop={p.onClickStop}
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        inputProps={{
          autoFocus: true,
          onKeyDown: handleKeyDown,
        }}
        ref={inputRef}
        isLoading={p.isLoading}
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <SuggestionAutoCompleter
          filteredSuggestions={filteredSuggestions}
          selectedSuggestionIndex={selectedSuggestionIndex}
          onSubmit={submitSuggestion}
        />
      )}

      <BadgeSuggestionList />
      {currentSuggestion && (
        <DialogLinkInput
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
          currentSuggestion={currentSuggestion}
        />
      )}
    </div>
  );
}
