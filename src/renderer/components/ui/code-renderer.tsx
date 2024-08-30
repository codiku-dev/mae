import type { CodeToHtmlOptions } from '@llm-ui/code';
import {
  allLangs,
  allLangsAlias,
  loadHighlighter,
  useCodeBlockToHtml,
} from '@llm-ui/code';
// WARNING: Importing bundledThemes increases your bundle size
// see: https://llm-ui.com/docs/blocks/code#bundle-size
//@ts-ignore
import { type LLMOutputComponent } from '@llm-ui/react';
import parseHtml from 'html-react-parser';
import { ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import { getHighlighterCore } from 'shiki/core';
import { bundledLanguagesInfo } from 'shiki/langs';
import { bundledThemes } from 'shiki/themes';
import getWasm from 'shiki/wasm';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const highlighter = loadHighlighter(
  getHighlighterCore({
    langs: allLangs(bundledLanguagesInfo),
    langAlias: allLangsAlias(bundledLanguagesInfo),
    themes: Object.values(bundledThemes),
    loadWasm: getWasm,
  }),
);

const codeToHtmlOptions: CodeToHtmlOptions = {
  theme: 'snazzy-light',
};

// Customize this component with your own styling
export const CodeRenderer: LLMOutputComponent = (p: { blockMatch: any }) => {
  const [hasCopiedRecently, setHasCopiedRecently] = useState(false);

  const { html, code } = useCodeBlockToHtml({
    markdownCodeBlock: p.blockMatch.output,
    highlighter,
    codeToHtmlOptions,
  });

  const handleCopyContent = () => {
    setHasCopiedRecently(true);
    setTimeout(() => {
      setHasCopiedRecently(false);
    }, 3000);
    window.electron.ipcRenderer.sendMessage(
      'copy-text-to-clipboard-request',
      code,
    );
  };

  if (!html) {
    // fallback to <pre> if Shiki is not loaded yet
    return (
      <pre className="shiki">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="relative cursor-pointer my-2"
            onClick={handleCopyContent}
          >
            <style>{`
              pre {
                padding: 15px;
                border-radius: 10px 0 10px 10px;
                overflow-x: auto;
              }
            `}</style>
            {parseHtml(html)}
            {hasCopiedRecently && (
              <div className="absolute right-2 top-2">
                <ClipboardCheck size={16} className="text-green-500" />
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-black text-white">
          <p>Click to copy code</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
