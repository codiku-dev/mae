//@ts-ignore
import { type LLMOutputComponent } from '@llm-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Customize this component with your own styling
export const MarkdownRenderer: LLMOutputComponent = (p: {
  blockMatch: any;
}) => {
  const markdown = p.blockMatch.output;
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>;
};
