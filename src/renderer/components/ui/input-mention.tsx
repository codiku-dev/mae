import { MentionsInput, Mention } from 'react-mentions';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';
import { BadgeSuggestionList } from '../features/ai-search/badge-suggestion-list';
import { DialogLinkInput } from '../features/ai-search/dialog-link-input';
import { useRef, useState } from 'react';
import {
  SearchSuggestionTag,
  useAppStore,
} from '@/renderer/hooks/use-app-store';
import { webScraperService } from '@/main/services/web-scapper/web-scrapper-service';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading: boolean;
  onClickStop: () => void;
};
const optionList = [
  // { id: 1, display: 'web' },
  { id: 2, display: 'doc' },
];
export const InputMention = (p: Props) => {
  let inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setisLoading] = useState(false);
  const {
    setCurrentSearchSuggestions,
    isWebsiteIndexed,
    addWebsiteToIndexedWebsites,
  } = useAppStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] =
    useState<SearchSuggestionTag>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (p.value === '') return;
    p.onSubmit(p.value);
  };

  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.inputElement.focus();
    }, 50);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // remove any part that start with @[doc]* from the input but keep the rest around spaces
    p.onChange(p.value.replace(/@\[doc\]\S+\s?/, '').trim());
    // setCurrentSuggestion(undefined);
    focusInput();
  };

  const handleDialogSubmit = async (link: string) => {
    if (currentSuggestion) {
      // first add the "@suggestion" to the input
      setCurrentSearchSuggestions([
        // ...currentSearchSuggestions,
        {
          id: uuidv4(),
          link,
          suggestion: currentSuggestion,
        },
      ]);
      // Remove any word starting with "@" from the input
      const newValue = p.value.replace(/@\S+\s?/, '').trim();
      p.onChange(newValue);

      if (!isWebsiteIndexed(link)) {
        setisLoading(true);

        const newIndexedWebsiteContent =
          await webScraperService.fetchWebsiteContent(link);
        p;
        await window.electron.ipcRenderer.invoke(
          'langchain-learn',
          newIndexedWebsiteContent,
        );

        addWebsiteToIndexedWebsites({
          url: link,
          scrapedContent: newIndexedWebsiteContent.map((website) => ({
            url: website.url,
            htmlContent: '',
            sizeKb: website.sizeKb,
          })),
        });
        setisLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <MentionsInput
        id="ai-search-input"
        className="interactive"
        ref={(r) => {
          inputRef.current = r;
        }}
        autoFocus
        singleLine
        value={p.value}
        onChange={(e) => {
          p.onChange(e.target.value);
        }}
        style={mentionInListStyle}
        customSuggestionsContainer={(children) => (
          <div className="absolute right-0 top-[0.64rem]">{children}</div>
        )}
      >
        <Mention
          trigger="@"
          data={optionList}
          style={mentionInInputStyle}
          onAdd={(entryId, entry) => {
            setCurrentSuggestion(entry as SearchSuggestionTag);
            setIsDialogOpen(true);
          }}
          renderSuggestion={(entry) => {
            return <div>{entry.display}</div>;
          }}
        />
      </MentionsInput>
      <Button
        disabled={p.value === ''}
        variant="outline"
        size="icon"
        id="ai-search-button"
        className="interactive cursor-pointer shadow-md w-[3.35rem] h-[2.50rem] absolute right-0 top-[0.64rem] transform  rounded-full bg-black text-white"
        type="submit"
      >
        <ArrowRight className="size-4" />
      </Button>
      <BadgeSuggestionList isLoading={isLoading} />
      {currentSuggestion && (
        <DialogLinkInput
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
          currentSuggestion={currentSuggestion}
        />
      )}
    </form>
  );
};

export const mentionInListStyle = {
  control: {
    // fontSize: 14,
    // fontWeight: 'normal',
    // color: 'black',

    paddingTop: 10,
    paddingLeft: 20,
  },

  '&singleLine': {
    marginTop: 10,
    display: 'inline-block',
    width: '100%',
    color: 'black',

    // Removed all style properies
    highlighter: {
      padding: 1,
      border: 'unset',
    },
    input: {
      backgroundColor: 'white',
      paddingLeft: 20,
      paddingRight: 60, // Add right padding to accommodate the button
      outline: 'none', // Add this line to remove the focus ring
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '2rem',
      height: 40,
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#d1edfd',
      },
    },
  },
};

const mentionInInputStyle = {
  backgroundColor: '#d1edfd',
  paddingTop: 4,
};
