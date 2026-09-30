import ArticleGrid from '../components/ArticleGrid';
import SectionHeader from '../components/SectionHeader';
import { categoryById } from '../data/siteConfig';
import { getCategoryArticles } from '../lib/api';
import { useAsync, usePageTitle } from '../lib/hooks';

export default function CategoryPage({ id }) {
  const category = categoryById(id);
  usePageTitle(`${category.title} — AlgoForge`);
  const { data, error, loading } = useAsync(() => getCategoryArticles(id), [id]);

  return (
    <div className="py-16 px-4 lg:px-8 max-w-7xl mx-auto w-full">
      <SectionHeader as="h1" kicker={`// ${category.track}`} title={category.title}>
        <p className="text-xs font-mono text-fg-2 max-w-sm">{category.description}</p>
      </SectionHeader>
      <ArticleGrid articles={data ?? []} loading={loading} error={error} emptyText="NO_ARTICLES_YET — CHECK_BACK_SOON" />
    </div>
  );
}
