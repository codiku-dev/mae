import { MentionsInput, Mention } from 'react-mentions';
import { Button } from '../../../ui/button';
import { ArrowRight, Square, PlusCircle, Book, Globe } from 'lucide-react';
import { BadgeSuggestionList } from '../badge-suggestion-list';
import { DialogLinkInput } from '../dialog-link-input';
import { useRef, useState } from 'react';
import {
  useAppStore,
} from '@/renderer/hooks/use-app-store';
import { webScraperService } from '@/main/services/web-scapper/web-scrapper-service';
import { v4 as uuidv4 } from 'uuid';
import { mentionInInputStyle, mentionInListStyle } from './searchbar-style';
import { logToMain } from '@/renderer/libs/utils';
import { dialog } from 'electron';

type Props = {
  value: string;
  isStreamingFinished: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading: boolean;
  onClickStop: () => void;
};
export const SUGGESTION_OPTIONS_ID = {
  SEARCH_WEB: "1",
  ADD_DOC: "2",
}
export const optionList = [
  { id: SUGGESTION_OPTIONS_ID.SEARCH_WEB, display: 'web', type: "search-web" },
  { id: SUGGESTION_OPTIONS_ID.ADD_DOC, display: 'Add doc', type: 'add-doc' },
];
export const Searchbar = (p: Props) => {
  let inputRef = useRef<HTMLInputElement>();

  const {
    setCurrentSearchSuggestions,
    currentSearchSuggestions,
    isWebsiteIndexed,
    addWebsiteToIndexedWebsites,
    getCommands
  } = useAppStore();

  const [isLoading, setisLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] =
    useState<"1" | "2">();
  const selectedSuggestion = currentSearchSuggestions?.[0]
  logToMain(`the current suggestion is ${JSON.stringify(currentSearchSuggestions)}`)

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

  const fetchAndStoreDocumentation = async (link: string, command: string) => {
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
  const handleDialogSubmit = async (link: string, command: string) => {

    // first add the "@suggestion" to the input


    // Remove any word starting with "@" from the input
    // let newValue = p.value.replace(/@ \Add doc\S+\s?/, '').trim();

    // remove also anything of this form @[anything](anything) 
    let newValue = p.value.replace(/@\[.*?\]\S+\s?/, '')
    p.onChange(newValue);
    logToMain(`the dialog mode is  ${dialogMode}`)
    if (dialogMode == SUGGESTION_OPTIONS_ID.ADD_DOC) {
      fetchAndStoreDocumentation(link, command);
      setCurrentSearchSuggestions([
        {
          id: SUGGESTION_OPTIONS_ID.ADD_DOC,
          link,
          suggestion: selectedSuggestion?.suggestion,
        },
      ]);
    } else if (dialogMode == SUGGESTION_OPTIONS_ID.SEARCH_WEB) {
      setisLoading(true);
      setCurrentSearchSuggestions([
        {
          id: SUGGESTION_OPTIONS_ID.SEARCH_WEB,
          link,
          suggestion: selectedSuggestion?.suggestion,
        },
      ]);
      await window.electron.ipcRenderer.invoke('delete-all-doc-in-memory');
      const websiteContent = await webScraperService.fetchWebsiteContent(link);
      await window.electron.ipcRenderer.invoke('add-doc-in-memory', websiteContent);

      setisLoading(false);
    }
  };
  const getDropdownItemIcon = (suggestionId: string) => {

    switch (suggestionId) {
      case SUGGESTION_OPTIONS_ID.SEARCH_WEB:
        return Globe;
      case SUGGESTION_OPTIONS_ID.ADD_DOC:
        return PlusCircle
      default:
        return Book
    }
  }

  const onSelectSuggestion = (entryId: string, entry: string) => {
    logToMain(`Selecting suggestion ${entryId}`)
    switch (entryId) {
      case SUGGESTION_OPTIONS_ID.ADD_DOC:
      case SUGGESTION_OPTIONS_ID.SEARCH_WEB:
        logToMain(`Opening dialog for ${entryId}`)
        setIsDialogOpen(true);
        setDialogMode(entryId as "1" | "2");
        break;
      default:
        const command = getCommands().find(c => c.command === entry);
        logToMain(`Selecting command ${command?.command} `)
        if (command && command.url) {
          const newSuggestionId = uuidv4()
          setCurrentSearchSuggestions([
            {
              id: newSuggestionId,
              link: command.url,
              suggestion: "doc",
            },
          ]);
        }
        break;
    }
    const newValue = p.value.replace(/(.*)@/, '$1')
    p.onChange(newValue);
  }



  const onDeleteBadge = () => {
    if (dialogMode === SUGGESTION_OPTIONS_ID.SEARCH_WEB) {
      window.electron.ipcRenderer.invoke('delete-all-doc-in-memory');
    }
    setCurrentSearchSuggestions([])
  }
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
          })).sort((a, b) => a.display.localeCompare(b.display))
          ]}
          style={mentionInInputStyle}
          onAdd={(entryId, entry) => {
            onSelectSuggestion(entryId as string, entry as string);
          }}
          renderSuggestion={(entry) => {
            const Icon = getDropdownItemIcon(entry.id as string);
            return (
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
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
      {selectedSuggestion && <BadgeSuggestionList currentSuggestion={selectedSuggestion} isLoading={isLoading} onRemoveLink={onDeleteBadge} />}
      {dialogMode && <DialogLinkInput
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        dialogMode={dialogMode}
      />}
    </form>
  );
};

