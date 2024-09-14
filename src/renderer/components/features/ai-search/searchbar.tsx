import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { PlaceholdersAndVanishInput } from '../../ui/placeholders-and-vanish-input';
import { SearchSuggestions } from './search-suggestions';
import { SearchSuggestion, useAppStore } from '@/renderer/hooks/use-app-store';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent } from '../../ui/dropdown-menu';
import { Badge } from '../../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { v4 as uuidv4 } from 'uuid';
import { X } from 'lucide-react'; // Add this import at the top of the file

// cmd + shift + P to toggle
const placeholders = [
  'Ask any question and press enter !',
  '⌘ + ⇧ + P to open and close',
];
const formatLinkForDisplay = (link: string) => {
  return link.replace(/^(https?:\/\/)?(www\.)?/, '').slice(0, 10) + '...';
};

export function SearchBar(p: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading: boolean;
  onClickStop: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLButtonElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [linksToLearnFrom, setLinksToLearnFrom] = useState<
    {
      id: string;
      link: string;
      suggestion: SearchSuggestion;
    }[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [currentSuggestion, setCurrentSuggestion] =
    useState<SearchSuggestion | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    p.onChange(newValue);

    if (newValue[newValue.length - 1] === '@') {
      setShowSuggestions(true);
    }
  };
  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  useEffect(focusInput, [linksToLearnFrom]);
  useEffect(() => {
    if (!showSuggestions || !isDialogOpen) {
      console.log('is not dialog open anymore');
      focusInput();
    }
  }, [showSuggestions, isDialogOpen]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('handleKeyDown', e.key);
      if (e.key === 'Backspace' && showSuggestions) {
        setShowSuggestions(false);
        const newValue = p.value.slice(0, -1);
        p.onChange(newValue);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSuggestions]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    p.onSubmit(p.value);
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    setShowSuggestions(false);
    setCurrentSuggestion(suggestion);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (currentSuggestion && linkInput) {
      setLinksToLearnFrom([
        ...linksToLearnFrom,
        { link: linkInput, suggestion: currentSuggestion, id: uuidv4() },
      ]);
      setIsDialogOpen(false);
      setLinkInput('');
      setCurrentSuggestion(null);
      const newValue = p.value.replace(/@$/, '').trim();
      p.onChange(newValue);
    }
  };

  const removeLink = (id: string) => {
    setLinksToLearnFrom(linksToLearnFrom.filter((link) => link.id !== id));
  };

  return (
    <div>
      <DropdownMenu open={showSuggestions}>
        <PlaceholdersAndVanishInput
          value={p.value}
          onChangeValue={p.onChange}
          onClickStop={p.onClickStop}
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
          inputProps={{
            autoFocus: true,
          }}
          ref={inputRef}
          isLoading={p.isLoading}
        >
          <DropdownMenuTrigger asChild>
            <button className="invisible">hi</button>
          </DropdownMenuTrigger>
        </PlaceholdersAndVanishInput>

        <DropdownMenuContent className="-mt-2 ml-28">
          <SearchSuggestions
            show={showSuggestions}
            onSelect={selectSuggestion}
            ref={suggestionRef}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      {linksToLearnFrom.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {linksToLearnFrom.map((link) => (
            <Badge key={link.id} className="pr-1 flex items-center">
              <span>
                {link.suggestion} {formatLinkForDisplay(link.link)}
              </span>
              <button
                onClick={() => removeLink(link.id)}
                className="ml-1 text-xs hover:text-red-500 focus:outline-none"
                aria-label="Remove link"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Enter a {currentSuggestion} link to learn from
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDialogSubmit}>
            <Input
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="https://super-documentation.com"
              className="mt-4"
            />
            <DialogFooter className="mt-4">
              <Button type="submit">Train from link</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
