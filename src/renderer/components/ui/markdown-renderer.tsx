import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../libs/utils';

// Import Shadcn components
import { ScrollArea } from './scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

export const MarkdownRenderer = (p: { blockMatch: any }) => {
  const markdown = p.blockMatch.output;

  return (
    <ReactMarkdown
      className="text-sm leading-7"
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ className, ...props }) => (
          <h1
            className={cn(
              'scroll-m-20 text-2xl font-extrabold tracking-tight ',
              className,
            )}
            {...props}
          />
        ),
        h2: ({ className, ...props }) => (
          <h2
            className={cn(
              'scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0',
              className,
            )}
            {...props}
          />
        ),
        h3: ({ className, ...props }) => (
          <h3
            className={cn(
              'scroll-m-20 text-lg font-semibold tracking-tight',
              className,
            )}
            {...props}
          />
        ),
        h4: ({ className, ...props }) => (
          <h4
            className={cn(
              'scroll-m-20 text-xl font-semibold tracking-tight',
              className,
            )}
            {...props}
          />
        ),
        p: ({ className, ...props }) => (
          <p
            className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
            {...props}
          />
        ),
        a: ({ className, href, children, ...props }) => (
          <a
            className={cn(
              'font-medium text-primary underline underline-offset-4',
              className,
            )}
            onClick={(e) => {
              e.preventDefault();
              if (href)
                window.electron.ipcRenderer.sendMessage(
                  'request-open-external-link',
                  href,
                );
            }}
            href={href}
            {...props}
          >
            {children}
          </a>
        ),
        ul: ({ className, ...props }) => (
          <ul
            className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
            {...props}
          />
        ),
        ol: ({ className, ...props }) => (
          <ol
            className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
            {...props}
          />
        ),
        blockquote: ({ className, ...props }) => (
          <blockquote
            className={cn('mt-6 border-l-2 pl-6 italic', className)}
            {...props}
          />
        ),
        code: ({ className, inline, ...props }) =>
          inline ? (
            <code
              className={cn(
                'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
                className,
              )}
              {...props}
            />
          ) : (
            <code
              className={cn(
                'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
                className,
              )}
              {...props}
            />
          ),
        pre: ({ className, ...props }) => (
          <pre
            className={cn(
              'mb-4 mt-6 overflow-x-auto rounded-lg bg-black p-4',
              className,
            )}
            {...props}
          />
        ),
        table: ({ className, ...props }) => (
          <ScrollArea className="my-6 w-full overflow-auto">
            <Table className={cn('w-full', className)} {...props} />
          </ScrollArea>
        ),
        thead: ({ ...props }) => <TableHeader {...props} />,
        tbody: ({ ...props }) => <TableBody {...props} />,
        tr: ({ ...props }) => <TableRow {...props} />,
        th: ({ className, ...props }) => (
          <TableHead
            className={cn(
              'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
              className,
            )}
            {...props}
          />
        ),
        td: ({ className, ...props }) => (
          <TableCell
            className={cn(
              'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
              className,
            )}
            {...props}
          />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};
