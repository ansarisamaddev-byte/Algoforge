import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleFilter from '../components/ArticleFilter';
import ArticleGrid from '../components/ArticleGrid';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import SectionHeader from '../components/SectionHeader';
import TrackCard from '../components/TrackCard';
import { siteConfig } from '../data/siteConfig';
import { getArticles } from '../lib/api';
import { usePageTitle, useAsync } from '../lib/hooks';

export default function Home() {
  usePageTitle(`${siteConfig.name} — ${siteConfig.tagline}`);
  const { data, error, loading } = useAsync(getArticles, []);
  const [filter, setFilter] = useState('all');

  const articles = data ?? [];
  const latest = articles.filter((a) => filter === 'all' || a.category === filter).slice(0, 6);
  const count = (id) => (data ? articles.filter((a) => a.category === id).length : null);
  const metrics = [...(data ? [{ value: articles.length, label: 'ARTICLES' }] : []), ...siteConfig.metrics];

  return (
    <>
      <Hero metrics={metrics} />

      <section id="explore" className="py-16 lg:py-20 px-4 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-16">
        <SectionHeader kicker="// CORE_CURRICULUM" title="Explore the Forge">
          <p className="text-xs font-mono text-fg-2 max-w-sm">
            Structured learning pathways curated specifically for software engineers preparing for high-impact roles.
          </p>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {siteConfig.categories.map((c) => <TrackCard key={c.id} category={c} count={count(c.id)} />)}
        </div>
      </section>

      <section id="blog" className="py-16 lg:py-20 px-4 lg:px-8 max-w-7xl mx-auto w-full border-t border-line scroll-mt-16">
        <SectionHeader kicker="// PUBLISHED_TUTORIALS" title="Latest Articles">
          <ArticleFilter active={filter} onChange={setFilter} />
        </SectionHeader>
        <ArticleGrid articles={latest} loading={loading} error={error} emptyText="NO_ARTICLES_IN_THIS_CATEGORY_YET" />
        <div className="mt-8 font-mono text-xs">
          <Link to="/blog" className="text-forge hover:text-forge-hover">VIEW_ALL_ARTICLES →</Link>
        </div>
      </section>

      {/* <Newsletter /> */}
    </>
  );
}
