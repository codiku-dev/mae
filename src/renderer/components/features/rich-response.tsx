import {
  codeBlockLookBack,
  findCompleteCodeBlock,
  findPartialCodeBlock,
} from '@llm-ui/code';
import { markdownLookBack } from '@llm-ui/markdown';
//@ts-ignore
import { throttleBasic, useLLMOutput } from '@llm-ui/react';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
  const [userHasScrolled, setUserHasScrolled] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
        setUserHasScrolled(!isAtBottom);
      }
    };

    scrollRef.current?.addEventListener('scroll', handleScroll);
    return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(
    function scrollToBotWhenTextGrow() {
      if (scrollRef.current && !userHasScrolled) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    },
    [p.output, p.isLoading, userHasScrolled],
  );

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
      visibleText,
    );
  };

  const throttle = throttleBasic({
    readAheadChars: 20,
    targetBufferChars: 9,
    adjustPercentage: 0.3,
    frameLookBackMs: 10000,
    windowLookBackMs: 2000,
  });

  const { blockMatches, visibleText, isFinished } = useLLMOutput({
    throttle: undefined,
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

  const dotAnimation = (
    <div className="flex items-center gap-1">
      <span className="text-xs text-gray-400">is thinking</span>
      <div className="flex gap-0.5 mt-[6px]">
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );

  const avatarAssistant = (
    <div className="flex items-center gap-2 mb-1 justify-end">
      <img src={logo} className="size-8 rounded-full" alt="AI Avatar" />
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Mia</span>
        {p.isLoading && dotAnimation}
      </div>
    </div>
  );

  const renderAnswer = () => {
    return (
      <div className="flex flex-col gap-2 pb-4">
        {avatarAssistant}
        <div className="relative bg-sky-200/20 p-3 rounded-lg rounded-tr-none min-h-12">
          {isFinished &&
            p.isStreamFinished &&
            !p.isLoading &&
            renderCopyButton()}
          {p.isLoading ? (
            <div className="w-full flex flex-col gap-1">
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
              className="absolute right-2 top-0 rounded-sm hover:bg-gray-50/10"
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
            <p>Copy response</p>
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
      className="interactive mt-4 p-4 rounded-md bg-white animate-in flex flex-col gap-4 relative w-full shadow-xl"
    >
      <>
        <div
          ref={scrollRef}
          className="flex flex-col gap-4 max-h-[500px] overflow-y-auto py-2"
        >
          {renderQuestion()}
          {renderAnswer()}
        </div>
      </>
    </div>
  );
};
