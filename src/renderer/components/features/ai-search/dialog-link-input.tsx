import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/renderer/components/ui/dialog';
import { Input } from '@/renderer/components/ui/input';
import { SearchSuggestionTag } from '@/renderer/hooks/use-app-store';
import { SearchSuggestion } from './searchbar_';
import { isValidUrl } from '@/renderer/libs/utils';
import { useToast } from '@/renderer/hooks/use-toast';

interface DialogLinkInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: string, commandName: string) => void;
  currentSuggestion: SearchSuggestionTag;
}

export function DialogLinkInput({
  isOpen,
  onClose,
  onSubmit,
  currentSuggestion,
}: DialogLinkInputProps) {
  const [linkInput, setLinkInput] = useState('');
  const [commandName, setCommandName] = useState('');
  const commandNameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const submitLink = (link: string, command: string) => {
    console.log("the link is ", link)
    if (link) {
      if (isValidUrl(link)) {
        console.log("it's a valid link ", link);
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
      console.log('handleKeyDown', e.key);
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Enter') {
        console.log('submit link');
        submitLink(linkInput, commandName);
      }
    }
  }






  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      console.log('handlePaste');
      if (isOpen) {
        e.preventDefault();
        const pastedText = e.clipboardData?.getData('text');
        if (pastedText) {
          setLinkInput(pastedText);
          console.log("setLinkInput to ", pastedText)
          setCommandName(pastedText.split('://')[1]?.split(/[.\-_]/)[0] || '');
          //submitLink(pastedText, pastedText.split('://')[1]?.split(/[.\-_]/)[0] || '');
          commandNameRef.current?.focus();
        }
      }
    };

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
        onClose();
      }}
    >
      <DialogContent className="interactive" id="ai-dialog-link-learn">
        <DialogHeader>
          <DialogTitle>Add documentation from :</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="relative mt-4 space-y-4">
            <Input
              value={linkInput}
              onChange={(e) => { setLinkInput(e.target.value); console.log("linkInput is set in onchange to ", linkInput) }}
              placeholder="super-website.com"
              aria-label={`Enter ${currentSuggestion} link`}
            />
            <Input
              ref={commandNameRef}
              value={commandName}
              onChange={(e) => setCommandName(e.target.value)}
              placeholder="Command name "
              aria-label="Enter command name"
            />
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
