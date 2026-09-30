import { Search } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const OPTIONS = [{ id: 'all', label: 'ALL' }, ...siteConfig.categories.map((c) => ({ id: c.id, label: c.filterLabel }))];

/** Category buttons, plus an optional search box when `onQuery` is provided. */
export default function ArticleFilter({ active, onChange, query = '', onQuery, inputRef }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 font-mono text-xs min-w-0">
      {onQuery && (
        <label className="relative">
          <span className="sr-only">Search articles</span>
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-3" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="search articles..."
            className="bg-base border border-line pl-9 pr-3 py-1.5 text-fg placeholder-fg-3 focus:outline-none focus:border-forge w-full sm:w-56"
          />
        </label>
      )}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0" role="group" aria-label="Filter by category">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={active === o.id}
            onClick={() => onChange(o.id)}
            className={`px-3 py-1 border whitespace-nowrap ${
              active === o.id ? 'bg-forge border-forge text-on-forge font-bold' : 'bg-card border-line text-fg-2 hover:text-fg'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
