import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/renderer/components/ui/dialog';
import { Input } from '@/renderer/components/ui/input';
import { SearchSuggestionTag } from '@/renderer/hooks/use-app-store';
import { SearchSuggestion } from './searchbar';
import { isValidUrl } from '@/renderer/libs/utils';
import { useToast } from '@/renderer/hooks/use-toast';

interface DialogLinkInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: string) => void;
  currentSuggestion: SearchSuggestionTag;
}

export function DialogLinkInput({
  isOpen,
  onClose,
  onSubmit,
  currentSuggestion,
}: DialogLinkInputProps) {
  const [linkInput, setLinkInput] = useState('');
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkInput) {
      // Simple URL validation using a regular expression
      if (isValidUrl(linkInput)) {
        onSubmit(linkInput);
        setLinkInput('');
        onClose();
      } else {
        // Handle invalid URL (you might want to show an error message to the user)
        toast({
          title: 'Invalid URL',
          description: 'Please enter a valid URL',
          variant: 'destructive',
        });
        // TODO: Add user feedback for invalid URL
      }
    }
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (isOpen) {
        e.preventDefault();
        const pastedText = e.clipboardData?.getData('text');
        if (pastedText) {
          setLinkInput(pastedText);
          onSubmit(pastedText);
          onClose();
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [isOpen, onSubmit, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Enter a {currentSuggestion} link to learn from
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="relative mt-4">
            <Input
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="https://super-documentation.com"
              aria-label={`Enter ${currentSuggestion} link`}
            />
            <kbd className="pointer-events-none absolute right-[0.5rem] top-[0.7rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">paste</span> or ENTER
            </kbd>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
