import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert font-mono">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={cn("font-mono text-sm bg-muted px-1.5 py-0.5 rounded", className)} {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 font-mono">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8 mb-4 font-mono">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 font-mono">{children}</h3>,
          p: ({ children }) => <p className="mb-4 font-mono">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4 font-mono">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 font-mono">{children}</ol>,
          li: ({ children }) => <li className="mb-2 font-mono">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline font-mono"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 font-mono">{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
