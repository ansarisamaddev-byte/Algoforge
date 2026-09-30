import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const here = path.dirname(fileURLToPath(import.meta.url));
export const CONTENT_DIR = path.resolve(process.env.CONTENT_DIR || path.join(here, '../../../content'));
const isProd = process.env.NODE_ENV === 'production';

let cache = null; // only used in production; in dev files are re-read on every request

const toDateString = (value) => {
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
};

const estimateReadTime = (text) => `${Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))} min read`;

async function readArticle(category, file) {
  const raw = await fs.readFile(path.join(CONTENT_DIR, category, file), 'utf8');
  const { data, content } = matter(raw);
  if (data.draft) return null;
  const body = content.replace(/^\s*#\s+.*\r?\n/, ''); // title comes from frontmatter
  const fallbackSlug = file.replace(/\.mdx?$/, '');
  return {
    slug: String(data.slug || fallbackSlug),
    title: data.title || fallbackSlug,
    description: data.description || '',
    category, // the folder name is the source of truth
    date: toDateString(data.date),
    readTime: data.readTime || estimateReadTime(body),
    featured: Boolean(data.featured),
    content: body,
  };
}

async function loadAll() {
  if (cache && isProd) return cache;
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true }).catch(() => []);
  const categories = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  const seen = new Set();
  const articles = [];

  for (const category of categories) {
    const files = (await fs.readdir(path.join(CONTENT_DIR, category))).filter((f) => /\.mdx?$/.test(f));
    for (const file of files) {
      try {
        const article = await readArticle(category, file);
        if (!article) continue;
        if (seen.has(article.slug)) {
          console.warn(`Duplicate slug "${article.slug}" in ${category}/${file} — skipped`);
          continue;
        }
        seen.add(article.slug);
        articles.push(article);
      } catch (err) {
        console.error(`Skipping ${category}/${file}: ${err.message}`);
      }
    }
  }

  articles.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  cache = { articles, categories };
  return cache;
}

const summary = ({ content: _content, ...rest }) => rest;

export async function listArticles({ category, q } = {}) {
  const { articles } = await loadAll();
  const needle = q?.trim().toLowerCase();
  return articles
    .filter((a) => !category || a.category === category)
    .filter((a) => !needle || `${a.title} ${a.description}`.toLowerCase().includes(needle))
    .map(summary);
}

export async function getArticle(slug) {
  const { articles } = await loadAll();
  return articles.find((a) => a.slug === slug) || null;
}

/** Returns null if the category folder does not exist. */
export async function getCategoryArticles(category) {
  const { articles, categories } = await loadAll();
  if (!categories.includes(category)) return null;
  return articles.filter((a) => a.category === category).map(summary);
}
