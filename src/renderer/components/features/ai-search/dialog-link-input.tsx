import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/renderer/components/ui/dialog';
import { Input } from '@/renderer/components/ui/input';
import { isValidUrl, logToMain } from '@/renderer/libs/utils';
import { useToast } from '@/renderer/hooks/use-toast';
import { Globe, Plus } from 'lucide-react';
import { optionList, SUGGESTION_OPTIONS_ID } from './searchbar/searchbar';
import { SearchSuggestion } from '@/renderer/hooks/use-app-store';

interface DialogLinkInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: string, commandName: string) => void;
  dialogMode: "1" | "2"
}

export function DialogLinkInput({
  isOpen,
  onClose,
  onSubmit,
  dialogMode,
}: DialogLinkInputProps) {

  const [linkInput, setLinkInput] = useState('');
  const [commandName, setCommandName] = useState('');
  const commandNameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();


  const currentOption = optionList.find(option => option.id == dialogMode);

  const submitLink = (link: string, command: string) => {
    if (link) {
      if (isValidUrl(link)) {
        onSubmit(link, command);
        setLinkInput('');
        setCommandName('');
        onClose();
      } else {
        toast({
          title: 'Invalid URL',
          description: 'Please enter a valid URL',
          variant: 'destructive',
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    submitLink(linkInput, commandName);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isOpen) {
      if (e.key === 'Enter') {
        console.log('submit link');
        submitLink(linkInput, commandName);
      }
    }
  }
  const handlePaste = (e: ClipboardEvent) => {
    if (isOpen) {
      e.preventDefault();
      const pastedText = e.clipboardData?.getData('text');
      if (pastedText) {
        setLinkInput(pastedText);
        setCommandName(pastedText.split('://')[1]?.split(/[.\-_]/)[0] || '');
        if (currentOption?.id == SUGGESTION_OPTIONS_ID.SEARCH_WEB) {
          submitLink(pastedText, pastedText.split('://')[1]?.split(/[.\-_]/)[0] || '');
        }
        commandNameRef.current?.focus();
      }
    }
  };
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onSubmit, onClose, handleKeyDown]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setLinkInput('');
        setCommandName('');
        setTimeout(() => {
          onClose();
        }, 100);
      }}
    >
      <DialogContent className="top-[15%] interactive" id="ai-dialog-link-learn">
        <DialogHeader>
          <DialogTitle>
            <div className='flex gap-2'>
              {dialogMode == SUGGESTION_OPTIONS_ID.SEARCH_WEB ?
                <><Globe className="w-4 h-4 mr-2" />Search the web</> :
                <> <Plus className="w-4 h-4 mr-2" />Add documentation</>
              }
            </div>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="relative mt-4 space-y-4">
            <Input
              value={linkInput}
              onChange={(e) => { setLinkInput(e.target.value); console.log("linkInput is set in onchange to ", linkInput) }}
              placeholder="super-website.com"
              aria-label={`Enter ${currentOption?.display} link`}
            />
            {currentOption?.id == SUGGESTION_OPTIONS_ID.ADD_DOC && <Input
              ref={commandNameRef}
              value={commandName}
              onChange={(e) => setCommandName(e.target.value.slice(0, 15))}
              placeholder="Command name "
              aria-label="Enter command name"
              maxLength={15}
            />
            }
            <kbd className="pointer-events-none absolute right-[0.5rem] -top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">paste</span>
            </kbd>
          </div>
          <p className='mt-4'>Press  <kbd className="pointer-events-none  h-5 select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 ">
            <span className="text-xs">Enter</span>
          </kbd> to submit</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
