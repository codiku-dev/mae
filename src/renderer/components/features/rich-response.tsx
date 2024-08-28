import {
  codeBlockLookBack,
  findCompleteCodeBlock,
  findPartialCodeBlock,
} from '@llm-ui/code';
import { markdownLookBack } from '@llm-ui/markdown';
//@ts-ignore
import { useLLMOutput } from '@llm-ui/react';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../../assets/icon.png';
import { Button } from '../ui/button';
import { CodeRenderer } from '../ui/code-renderer';
import { MarkdownRenderer } from '../ui/markdown-renderer';

import { Skeleton } from '../ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export const RichResponse = (p: {
  question: string;
  output: string;
  isLoading: boolean;
  isStreamFinished: boolean;
}) => {
  const [hasCopiedRecently, setHasCopiedRecently] = useState(false);
  const [userName, setUsername] = useState<any>(null);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('user-info-request');
    window.electron.ipcRenderer.on('user-info-reply', (username) => {
      setUsername(username);
    });
  }, []);
  const handleClickCopyContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHasCopiedRecently(true);
    setTimeout(() => {
      setHasCopiedRecently(false);
    }, 3000);
    window.electron.ipcRenderer.sendMessage(
      'copy-text-to-clipboard-request',
      p.output,
    );
  };

  const { blockMatches } = useLLMOutput({
    llmOutput: p.output,
    fallbackBlock: {
      component: MarkdownRenderer,
      lookBack: markdownLookBack(),
    },
    blocks: [
      {
        component: CodeRenderer,
        findCompleteMatch: findCompleteCodeBlock(),
        findPartialMatch: findPartialCodeBlock(),
        lookBack: codeBlockLookBack(),
      },
    ],
    isStreamFinished: p.isStreamFinished,
  });

  const renderAnswer = () => {
    return (
      <div className="flex flex-col gap-2 ">
        <div className="flex items-center gap-2 mb-1 justify-end">
          <img src={logo} className="size-8 rounded-full" alt="AI Avatar" />
          <span className="text-sm text-gray-500">Mia</span>
        </div>
        <div className="bg-blue-400/20 p-3 rounded-lg rounded-tr-none">
          {p.isStreamFinished && renderCopyButton()}
          {p.isLoading ? (
            <div className="w-full flex flex-col gap-1 mt-5">
              <Skeleton className="w-full h-6" />
            </div>
          ) : (
            blockMatches.map((blockMatch: any, index: number) => {
              const Component = blockMatch.block.component;
              return <Component key={index} blockMatch={blockMatch} />;
            })
          )}
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    return (
      <div className="flex flex-col gap-2 max-w-[80%]">
        <div className="flex items-center gap-2 mb-1 ">
          <div className="bg-gray-200 size-8 rounded-full text-lg text-gray-600 flex items-center justify-center">
            {userName ? userName[0].toUpperCase() : 'U'}
          </div>
          <span className="text-sm text-gray-500">{userName || 'User'}</span>
        </div>
        <div className="bg-gray-200 p-3 rounded-lg rounded-tl-none">
          <p>{p.question}</p>
        </div>
      </div>
    );
  };
  const renderCopyButton = () => {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="absolute right-4 bottom-7 rounded-sm hover:bg-gray-50/10"
              onClick={handleClickCopyContent}
            >
              {hasCopiedRecently ? (
                <ClipboardCheck size={16} />
              ) : (
                <Clipboard size={16} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-black text-white">
            <p>Copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="interactive mt-4 p-4 rounded-md bg-white animate-in flex flex-col gap-4 relative w-full"
    >
      <>
        <div className="mt-5 flex flex-col gap-4 max-h-[500px] overflow-y-auto">
          {renderQuestion()}
          {renderAnswer()}
        </div>
      </>
    </div>
  );
};
