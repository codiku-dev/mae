import { MentionsInput, Mention } from 'react-mentions';
import { Button } from '../../ui/button';
import { ArrowRight, Square, PlusCircle, Book } from 'lucide-react';
import { BadgeSuggestionList } from './badge-suggestion-list';
import { DialogLinkInput } from './dialog-link-input';
import { useRef, useState } from 'react';
import {
  SearchSuggestionTag,
  useAppStore,
} from '@/renderer/hooks/use-app-store';
import { webScraperService } from '@/main/services/web-scapper/web-scrapper-service';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  value: string;
  isStreamingFinished: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading: boolean;
  onClickStop: () => void;
};
const ENTRY_IDS = {
  ADD_DOC: 2
}
const optionList = [
  { id: 1, display: 'web' },
  { id: 2, display: 'Add doc', type: 'add-doc' },
];
export const Searchbar = (p: Props) => {
  let inputRef = useRef<HTMLInputElement>();

  const {
    setCurrentSearchSuggestions,
    isWebsiteIndexed,
    addWebsiteToIndexedWebsites,
    getCommands
  } = useAppStore();

  const [isLoading, setisLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] =
    useState<SearchSuggestionTag>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!p.isStreamingFinished) {
      p.onClickStop();
      focusInput()
    } else {
      if (p.value === '') return;
      p.onSubmit(p.value);
    }
  };

  const focusInput = () => {
    setTimeout(() => {
      (inputRef.current as any).inputElement.focus();
    }, 50);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    p.onChange(p.value.replace(/@\[\Add doc\]\S+\s?/, '').trim());
    focusInput();
  };

  const handleDialogSubmit = async (link: string, command: string) => {
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
      let newValue = p.value.replace(/@ \Add doc\S+\s?/, '').trim();

      // remove also anything of this form @[anything](anything) 
      newValue = newValue.replace(/@\[.*?\]\S+\s?/, '')

      p.onChange(newValue);

      if (!isWebsiteIndexed(link)) {
        setisLoading(true);

        const newIndexedWebsiteContent =
          await webScraperService.fetchWebsiteContent(link);

        await window.electron.ipcRenderer.invoke(
          'langchain-learn',
          newIndexedWebsiteContent,
        );

        addWebsiteToIndexedWebsites({
          url: link,
          commandName: command,
          subwebsite: newIndexedWebsiteContent.map((website) => ({
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
        placeholder="How can I help you?"
        id="ai-search-input"
        className="interactive"
        ref={(r) => {
          (inputRef.current as any) = r;
        }}
        autoFocus
        singleLine
        value={p.value}
        onChange={(e) => {
          p.onChange(e.target.value);
        }}
        style={mentionInListStyle}
        customSuggestionsContainer={(children) => (
          <div className="absolute top-[0.9rem]">{children}</div>
        )}
      >
        <Mention
          trigger="@"
          data={[...optionList, ...getCommands().map((command) => ({
            id: command.command,
            display: command.command,
            type: 'doc'
          }))]
          }
          style={mentionInInputStyle}
          onAdd={(entryId, entry) => {
            setCurrentSuggestion(entry as SearchSuggestionTag);
            if (entryId === ENTRY_IDS.ADD_DOC) {
              setIsDialogOpen(true);
            } else {
              const command = getCommands().find(c => c.command === entry);
              if (command) {
                setCurrentSearchSuggestions([

                  {
                    id: uuidv4(),
                    link: command?.url!,
                    suggestion: "doc"
                  },
                ]);

                const newValue = p.value.replace(/(.*)@/, '$1')
                p.onChange(newValue);
              }
            }
          }}
          renderSuggestion={(entry) => {
            return (
              <div className="flex items-center gap-2">
                {entry.id === ENTRY_IDS.ADD_DOC ? (
                  <PlusCircle className="w-4 h-4" />
                ) : (
                  <Book className="w-4 h-4" />
                )}
                <span>{entry.display}</span>
              </div>
            );

          }}
        />
      </MentionsInput>
      <Button
        disabled={p.value === '' && p.isStreamingFinished}
        variant="outline"
        size="icon"
        id="ai-search-button"
        className="interactive cursor-pointer shadow-md w-[3.35rem] h-[2.50rem] absolute right-0 top-[0.64rem] transform  rounded-full bg-black text-white"
        type="submit"
      >
        {!p.isStreamingFinished ? <Square className="size-4" /> : <ArrowRight className="size-4" />}
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

    // Removed all style properies
    highlighter: {
      padding: 1,
      border: 'unset',
    },
    input: {
      fontSize: 14,
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
      borderRadius: '0.2rem',
    },
    item: {
      borderRadius: '0rem',
      padding: '5px 5px',
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
