import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleFilter from '../components/ArticleFilter';
import ArticleGrid from '../components/ArticleGrid';
import SectionHeader from '../components/SectionHeader';
import { getArticles } from '../lib/api';
import { useAsync, usePageTitle } from '../lib/hooks';

export default function Articles() {
  usePageTitle('Articles — AlgoForge');
  const { data, error, loading } = useAsync(getArticles, []);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { state } = useLocation();

  // Ctrl+K from the header lands here with focus requested.
  useEffect(() => {
    if (state?.focus) inputRef.current?.focus();
  }, [state]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data ?? [])
      .filter((a) => filter === 'all' || a.category === filter)
      .filter((a) => !q || `${a.title} ${a.description}`.toLowerCase().includes(q));
  }, [data, filter, query]);

  return (
    <div className="py-16 px-4 lg:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader as="h1" kicker="// ALL_TUTORIALS" title="Articles">
        <ArticleFilter active={filter} onChange={setFilter} query={query} onQuery={setQuery} inputRef={inputRef} />
      </SectionHeader>
      <ArticleGrid articles={results} loading={loading} error={error} emptyText="NO_MATCHING_ARTICLES" />
    </div>
  );
}
