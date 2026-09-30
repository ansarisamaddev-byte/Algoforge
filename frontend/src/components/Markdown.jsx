import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Link } from 'react-router-dom';
import { slugify, textOf } from '../lib/markdown';

const heading = (Tag) =>
  function Heading({ children }) {
    return <Tag id={slugify(textOf(children))} className="scroll-mt-24">{children}</Tag>;
  };

const components = {
  h2: heading('h2'),
  h3: heading('h3'),
  a({ href = '', children }) {
    if (href.startsWith('/')) return <Link to={href}>{children}</Link>;
    const external = /^https?:/.test(href);
    return <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
  },
  table: ({ children }) => <div className="overflow-x-auto"><table>{children}</table></div>,
  img: ({ src, alt }) => <img src={src} alt={alt || ''} loading="lazy" />,
  // Code blocks reuse the homepage terminal look.
  pre({ children }) {
    const code = Array.isArray(children) ? children[0] : children;
    const lang = /language-([\w-]+)/.exec(code?.props?.className || '')?.[1];
    return (
      <div className="border border-line bg-card">
        <div className="bg-panel border-b border-line px-4 py-2 flex items-center justify-between font-mono text-xs text-fg-3">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 bg-line" /><span className="w-2 h-2 bg-line" /><span className="w-2 h-2 bg-line" />
          </span>
          <span>{lang || 'text'}</span>
        </div>
        <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono text-fg">{children}</pre>
      </div>
    );
  },
};

export default function Markdown({ children }) {
  return (
    <div className="article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
