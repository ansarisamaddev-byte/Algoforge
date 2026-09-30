import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Notice } from '../components/ArticleGrid';
import Markdown from '../components/Markdown';
import { categoryById } from '../data/siteConfig';
import { getArticle } from '../lib/api';
import { useAsync, usePageTitle } from '../lib/hooks';
import { extractToc, formatDate } from '../lib/markdown';
import NotFound from './NotFound';

export default function Article() {
  const { slug } = useParams();
  const { data: article, error, loading } = useAsync(() => getArticle(slug), [slug]);
  usePageTitle(article ? `${article.title} — AlgoForge` : 'AlgoForge');

  if (error?.status === 404) return <NotFound message="That article does not exist (yet)." />;
  if (loading || error) {
    return (
      <div className="py-16 px-4 max-w-3xl mx-auto w-full">
        {loading ? <Notice>LOADING_ARTICLE...</Notice> : <Notice tone="error">ERROR :: {error.message}</Notice>}
      </div>
    );
  }

  const category = categoryById(article.category);
  const toc = extractToc(article.content);

  return (
    <article className="py-12 lg:py-16 px-4 lg:px-8 max-w-3xl mx-auto w-full">
      <Link to={category?.path ?? '/blog'} className="inline-flex items-center gap-2 font-mono text-xs text-fg-3 hover:text-forge mb-8">
        <ArrowLeft size={14} aria-hidden="true" /> {category?.title ?? 'Articles'}
      </Link>

      <header className="pb-8 border-b border-line">
        <div className="font-mono text-xs text-forge mb-3">{(category?.cardLabel ?? article.category).toUpperCase()}</div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-fg mb-4">{article.title}</h1>
        {article.description && <p className="text-lg text-fg-2 leading-relaxed mb-5">{article.description}</p>}
        <div className="font-mono text-xs text-fg-3">
          {article.readTime}{article.date && ` · ${formatDate(article.date)}`}
        </div>
      </header>

      {toc.length > 0 && (
        <nav aria-label="Table of contents" className="my-8 p-5 bg-card border border-line">
          <div className="font-mono text-xs text-forge mb-3">{'// TABLE_OF_CONTENTS'}</div>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-fg-2">
            {toc.map((t) => (
              <li key={t.id}><a href={`#${t.id}`} className="hover:text-forge">{t.text}</a></li>
            ))}
          </ol>
        </nav>
      )}

      <div className="mt-8">
        <Markdown>{article.content}</Markdown>
      </div>
    </article>
  );
}
