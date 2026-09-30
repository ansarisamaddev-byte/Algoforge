import ArticleCard from './ArticleCard';

export function Notice({ children, tone }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`border p-6 font-mono text-xs ${tone === 'error' ? 'border-red-500/60 text-red-500' : 'border-line text-fg-2'}`}
    >
      {children}
    </div>
  );
}

export default function ArticleGrid({ articles, loading, error, emptyText = 'NO_ARTICLES_FOUND' }) {
  if (loading) return <Notice>LOADING_ARTICLES...</Notice>;
  if (error) return <Notice tone="error">ERROR :: {error.message}</Notice>;
  if (!articles.length) return <Notice>{emptyText}</Notice>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
    </div>
  );
}
