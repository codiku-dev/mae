import { MarkdownRenderer } from '@/renderer/ui/markdown-renderer';
import {
  codeBlockLookBack,
  findCompleteCodeBlock,
  findPartialCodeBlock,
} from '@llm-ui/code';
import { markdownLookBack } from '@llm-ui/markdown';
import logo from '@/renderer/assets/icon-no-border.svg';
//@ts-ignore
import { useLLMOutput } from '@llm-ui/react';
import { CodeRenderer } from '@/renderer/ui/code-renderer';

import { Skeleton } from '@/renderer/ui/skeleton';
export function AIMessage(p: {
  message: string;
  isLoading?: boolean;
  isStreamFinished?: boolean;
}) {
  const { blockMatches } = useLLMOutput({
    throttle: undefined,
    llmOutput: p.message,
    fallbackBlock: {
      component: (p: any) => <MarkdownRenderer output={p.blockMatch.output} />,
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
  const avatarAssistant = (
    <div className="flex items-center gap-2 mb-1 justify-end ">
      <img
        src={logo}
        className="size-8 rounded-full shadow-md"
        alt="AI Avatar"
      />
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/70">Mia</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {avatarAssistant}
      <div className="relative bg-gradient-to-r from-primary via-secondary to-primary text-background p-3 rounded-lg rounded-tr-none min-h-12 shadow-md">
        {p.isLoading ? (
          <div className="w-full flex flex-col gap-1">
            <Skeleton className="w-full h-6 bg-secondary" />
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
}
