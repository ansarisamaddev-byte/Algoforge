import { Link } from 'react-router-dom';
import { categoryById } from '../data/siteConfig';

export default function ArticleCard({ article }) {
  const label = categoryById(article.category)?.cardLabel ?? article.category.toUpperCase();
  return (
    <Link to={`/blog/${article.slug}`} className="group block">
      <article className="h-full bg-card border border-line group-hover:border-line-strong p-6 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="font-mono text-xs text-forge bg-panel px-2 py-0.5 border border-line">{label}</span>
            <span className="font-mono text-xs text-fg-3 uppercase">{article.readTime}</span>
          </div>
          <h3 className="text-xl font-bold text-fg group-hover:text-forge transition-colors mb-2">{article.title}</h3>
          <p className="text-sm text-fg-2 line-clamp-2 leading-relaxed">{article.description}</p>
        </div>
        <div className="mt-6 pt-4 border-t border-line flex items-center justify-between font-mono text-xs text-fg-3 group-hover:text-fg">
          <span>READ_TUTORIAL</span>
          <span className="text-forge group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
        </div>
      </article>
    </Link>
  );
}
