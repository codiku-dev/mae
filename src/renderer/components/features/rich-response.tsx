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
      <div className="flex gap-2 items-center">
        <img src={logo} className="size-12" />
        {blockMatches.map((blockMatch: any, index: number) => {
          const Component = blockMatch.block.component;
          return <Component key={index} blockMatch={blockMatch} />;
        })}
      </div>
    );
  };

  const renderQuestion = () => {
    return (
      <div className="ml-1 flex gap-2 items-center font-bold">
        <div className="bg-blue-500 size-10 rounded-lg text-2xl text-white flex items-center justify-center">
          C
        </div>
        <p className="pl-1">{p.question}</p>
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
              className="absolute right-2 top-1 cursor-pointer ml-2 p-2 rounded-full hover:bg-gray-200"
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
      className="interactive mt-4 p-4 rounded-md bg-white animate-in flex justify-between items-start relative w-full"
    >
      {p.isLoading ? (
        <div className="w-full flex flex-col gap-1 mt-5">
          <Skeleton className="w-full h-6" />
        </div>
      ) : (
        <div className="flex">
          {p.isStreamFinished && renderCopyButton()}
          <div className="mt-5 flex flex-col gap-2 max-h-[500px] overflow-y-auto">
            {renderQuestion()}
            {renderAnswer()}
          </div>
        </div>
      )}
    </div>
  );
};
