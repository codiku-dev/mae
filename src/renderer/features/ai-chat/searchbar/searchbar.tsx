import { useAppStore } from '@/renderer/hooks/use-app-store';
import { useSearch } from '@/renderer/hooks/use-search';
import { logToMain } from '@/renderer/libs/utils';
import { webScraperService } from '@/renderer/services/web-scapper/web-scrapper-service';
import { ArrowRight, Book, Globe, PlusCircle, Square } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/renderer/ui/button';
import { BadgeSuggestionList } from '@/renderer/features/ai-chat/searchbar/badge-suggestion-list';
import { DialogLinkInput } from '@/renderer/features/ai-chat/searchbar/dialog-link-input';
import { getMentionInListStyle, mentionInInputStyle } from '@/renderer/features/ai-chat/searchbar/searchbar-style';

type Props = {
  value: string;
  isStreamingFinished: boolean;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onClickStop: () => void;
};
export const SUGGESTION_OPTIONS_ID = {
  SEARCH_WEB: '1',
  ADD_DOC: '2',
};
export const optionList = [
  { id: SUGGESTION_OPTIONS_ID.SEARCH_WEB, display: 'web', type: 'search-web' },
  { id: SUGGESTION_OPTIONS_ID.ADD_DOC, display: 'Add doc', type: 'add-doc' },
];
export const Searchbar = forwardRef<HTMLInputElement, Props>(
  (p: Props, inputRef) => {
    const [isFocused, setIsFocused] = useState(false);
    const { setIsDialogOpen, isDialogOpen } = useAppStore();

    const {
      setCurrentSearchSuggestions,
      currentSearchSuggestions,
      isWebsiteIndexed,
      addWebsiteToIndexedWebsites,
      getCommands,
    } = useSearch();

    const [isLoading, setisLoading] = useState(false);
    const [dialogMode, setDialogMode] = useState<'1' | '2'>();
    const selectedSuggestion = currentSearchSuggestions?.[0];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // check key is not enter
      // if (!p.isStreamingFinished) {
      //   p.onClickStop();
      //   focusInput()
      // } else {
      if (p.value === '') return;
      p.onSubmit(p.value);
      // }
    };

    const focusInput = () => {
      setTimeout(() => {
        (inputRef as any).current.focus();
      }, 50);
    };
    const handleDialogClose = () => {
      setIsDialogOpen(false);
      p.onChange(p.value.replace(/@\[\Add doc\]\S+\s?/, '').trim());
      focusInput();
    };

    const fetchAndStoreDocumentation = async (
      link: string,
      command: string,
    ) => {
      setCurrentSearchSuggestions([
        {
          id: SUGGESTION_OPTIONS_ID.ADD_DOC,
          link,
          suggestion: selectedSuggestion?.suggestion,
        },
      ]);

      if (!isWebsiteIndexed(link)) {
        logToMain('Website is not indexed yet');
        setisLoading(true);

        const newIndexedWebsiteContent =
          await webScraperService.fetchWebsiteContent(link);

        logToMain('Start learning');
        await window.electron.ipcRenderer.invoke(
          'add-vector-docs',
          newIndexedWebsiteContent,
        );

        logToMain('End learning');
        logToMain('Add links to cache');
        addWebsiteToIndexedWebsites({
          url: link,
          commandName: command,
          subwebsite: newIndexedWebsiteContent.map((website) => ({
            url: website.url,
            htmlContent: '',
            sizeKb: website.sizeKb,
          })),
        });
        logToMain('Links added cache');
        setisLoading(false);
      }
    };
    const handleDialogSubmit = async (link: string, command: string) => {
      // first add the "@suggestion" to the input

      // Remove any word starting with "@" from the input
      // let newValue = p.value.replace(/@ \Add doc\S+\s?/, '').trim();

      // remove also anything of this form @[anything](anything)
      let newValue = p.value.replace(/@\[.*?\]\S+\s?/, '');
      p.onChange(newValue);
      logToMain(`the dialog mode is  ${dialogMode}`);
      if (dialogMode == SUGGESTION_OPTIONS_ID.ADD_DOC) {
        fetchAndStoreDocumentation(link, command);
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
        const websiteContent =
          await webScraperService.fetchWebsiteContent(link);
        await window.electron.ipcRenderer.invoke(
          'add-doc-in-memory',
          websiteContent,
        );

        setisLoading(false);
      }
    };
    const getDropdownItemIcon = (suggestionId: string) => {
      switch (suggestionId) {
        case SUGGESTION_OPTIONS_ID.SEARCH_WEB:
          return Globe;
        case SUGGESTION_OPTIONS_ID.ADD_DOC:
          return PlusCircle;
        default:
          return Book;
      }
    };

    const onSelectSuggestion = (entryId: string, entry: string) => {
      switch (entryId) {
        case SUGGESTION_OPTIONS_ID.ADD_DOC:
        case SUGGESTION_OPTIONS_ID.SEARCH_WEB:
          setIsDialogOpen(true);
          setDialogMode(entryId as '1' | '2');
          break;
        default:
          const command = getCommands().find((c) => c.command === entry);
          logToMain(`Selecting command ${command?.command} `);
          if (command && command.url) {
            const newSuggestionId = uuidv4();
            setCurrentSearchSuggestions([
              {
                id: newSuggestionId,
                link: command.url,
                suggestion: 'doc',
              },
            ]);
          }
          break;
      }
      const newValue = p.value.replace(/(.*)@/, '$1');
      p.onChange(newValue);
    };

    const onDeleteBadge = () => {
      if (dialogMode === SUGGESTION_OPTIONS_ID.SEARCH_WEB) {
        window.electron.ipcRenderer.invoke('delete-all-doc-in-memory');
      }
      setCurrentSearchSuggestions([]);
    };
    return (
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          <MentionsInput
            placeholder="How can I help you?"
            id="ai-search-input"
            inputRef={inputRef}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            autoFocus
            singleLine
            value={p.value}
            onChange={(e) => {
              p.onChange(e.target.value);
            }}
            style={getMentionInListStyle({ isFocused })}
            customSuggestionsContainer={(children) => (
              <div className="absolute top-[0.9rem]">{children}</div>
            )}
          >
            <Mention
              trigger="@"
              data={[
                ...optionList,
                ...getCommands()
                  .map((command) => ({
                    id: command.command,
                    display: command.command,
                    type: 'doc',
                  }))
                  .sort((a, b) => a.display.localeCompare(b.display)),
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
          {/* Submit button button */}
          <Button
            disabled={p.value === '' && p.isStreamingFinished}
            variant="outline"
            size="icon"
            type="submit"
            className="cursor-pointer shadow-md w-[3.35rem] h-[2.40rem] absolute right-[0.05rem] top-[0.68rem] transform  rounded-full bg-primary text-white"
          >
            <ArrowRight className="size-4" />
          </Button>
          {selectedSuggestion && (
            <BadgeSuggestionList
              currentSuggestion={selectedSuggestion}
              isLoading={isLoading}
              onRemoveLink={onDeleteBadge}
            />
          )}
          {dialogMode && (
            <DialogLinkInput
              isOpen={isDialogOpen}
              onClose={handleDialogClose}
              onSubmit={handleDialogSubmit}
              dialogMode={dialogMode}
            />
          )}
        </form>
        {/* Click stop button */}
        {!p.isStreamingFinished && (
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={p.onClickStop}
            className="cursor-pointer shadow-md w-[3.35rem] h-[2.40rem] absolute right-[0.05rem] top-[0.68rem] transform  rounded-full bg-primary text-white"
          >
            <Square className="size-4" />
          </Button>
        )}
      </div>
    );
  },
);

Searchbar.displayName = 'Searchbar';
