import type { CodeToHtmlOptions } from '@llm-ui/code';
import {
  allLangs,
  allLangsAlias,
  loadHighlighter,
  useCodeBlockToHtml,
} from '@llm-ui/code';
// WARNING: Importing bundledThemes increases your bundle size
// see: https://llm-ui.com/docs/blocks/code#bundle-size
import { type LLMOutputComponent } from '@llm-ui/react';
import parseHtml from 'html-react-parser';
import { getHighlighterCore } from 'shiki/core';
import { bundledLanguagesInfo } from 'shiki/langs';
import { bundledThemes } from 'shiki/themes';

import getWasm from 'shiki/wasm';

const highlighter = loadHighlighter(
  getHighlighterCore({
    langs: allLangs(bundledLanguagesInfo),
    langAlias: allLangsAlias(bundledLanguagesInfo),
    themes: Object.values(bundledThemes),
    loadWasm: getWasm,
  }),
);

const codeToHtmlOptions: CodeToHtmlOptions = {
  theme: 'github-dark',
};

// Customize this component with your own styling
export const CodeRenderer: LLMOutputComponent = (p: { blockMatch: any }) => {
  const { html, code } = useCodeBlockToHtml({
    markdownCodeBlock: p.blockMatch.output,
    highlighter,
    codeToHtmlOptions,
  });
  if (!html) {
    // fallback to <pre> if Shiki is not loaded yet
    return (
      <pre className="shiki">
        <code>{code}</code>
      </pre>
    );
  }
  return <>{parseHtml(html)}</>;
};
