import { Router } from 'express';
import { getArticle, getCategoryArticles, listArticles } from '../services/articleService.js';

const router = Router();
const wrap = (fn) => (req, res, next) => fn(req, res).catch(next); // Express 4 doesn't catch async errors

router.get('/articles', wrap(async (req, res) => {
  const { category, q } = req.query;
  const articles = await listArticles({
    category: typeof category === 'string' ? category : undefined,
    q: typeof q === 'string' ? q : undefined,
  });
  res.json({ articles });
}));

router.get('/articles/:slug', wrap(async (req, res) => {
  const article = await getArticle(req.params.slug);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json({ article });
}));

router.get('/categories/:category', wrap(async (req, res) => {
  const articles = await getCategoryArticles(req.params.category);
  if (!articles) return res.status(404).json({ error: 'Category not found' });
  res.json({ category: req.params.category, articles });
}));

export default router;
