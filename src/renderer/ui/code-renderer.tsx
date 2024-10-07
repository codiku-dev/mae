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
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useCallback, useState } from 'react';
import { getHighlighterCore } from 'shiki/core';
import { bundledLanguagesInfo } from 'shiki/langs';
import { bundledThemes } from 'shiki/themes';
import getWasm from 'shiki/wasm';
import { Button } from './button';
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
  theme: 'github-light',
};

// Customize this component with your own styling
export const CodeRenderer: LLMOutputComponent = (p: { blockMatch: any }) => {
  const [hasCopiedRecently, setHasCopiedRecently] = useState(false);

  const { html, code } = useCodeBlockToHtml({
    markdownCodeBlock: p.blockMatch.output,
    highlighter,
    codeToHtmlOptions,
  });

  const getLanguage = useCallback(() => {
    const language = p.blockMatch.output.split('\n')[0];
    const trimmedLanguage = language.replace('```', '').trim();
    return trimmedLanguage;
  }, [p.blockMatch.output]);
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
    <div className="relative my-2">
      <style>{`
              pre {
                padding: 15px;
                border-radius: 0px 0px 10px 10px;
                overflow-x: auto;
              }
            `}</style>
      <div className="text-sm bg-black/90 py-2 pl-4 text-gray-300 rounded-t-lg flex justify-between  ">
        {getLanguage()}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="h-6 bg-transparent hover:bg-transparent rounded-sm  text-white"
                onClick={handleCopyContent}
              >
                {hasCopiedRecently ? (
                  <span className="flex items-center gap-2">
                    <ClipboardCheck size={16} /> Code copied
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Clipboard size={16} />
                    Copy code
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black text-white">
              <p>Copy code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {parseHtml(html)}
    </div>
  );
};
