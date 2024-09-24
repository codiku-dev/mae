import logo from '../../../../assets/icon.png';
import { MarkdownRenderer } from "@/renderer/components/ui/markdown-renderer";
import {
    codeBlockLookBack,
    findCompleteCodeBlock,
    findPartialCodeBlock,
} from '@llm-ui/code';
import { markdownLookBack } from '@llm-ui/markdown';
//@ts-ignore
import { useLLMOutput } from '@llm-ui/react';
import { CodeRenderer } from '../../../ui/code-renderer';

import { Skeleton } from "@/renderer/components/ui/skeleton";
export function AIMessage(p: { message: string, isLoading?: boolean }) {


    const { blockMatches } = useLLMOutput({
        throttle: undefined,
        llmOutput: p.message,
        fallbackBlock: {
            component: (p: any) => <MarkdownRenderer markdownText={p.blockMatch.output} />,
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
        isStreamFinished: true,
    });
    const avatarAssistant = (
        <div className="flex items-center gap-2 mb-1 justify-end">
            <img src={logo} className="size-8 rounded-full" alt="AI Avatar" />
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Mia</span>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-2">
            {avatarAssistant}
            <div className="relative bg-[#e5f0ff] p-3 rounded-lg rounded-tr-none min-h-12">
                {p.isLoading ? <div className="w-full flex flex-col gap-1">
                    <Skeleton className="w-full h-6" />
                </div> :
                    blockMatches.map((blockMatch: any, index: number) => {
                        const Component = blockMatch.block.component;
                        return <Component key={index} blockMatch={blockMatch} />;
                    })}
            </div>
        </div>
    );
}
