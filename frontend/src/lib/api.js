const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path) {
  let res;
  try {
    res = await fetch(`${BASE}/api${path}`);
  } catch {
    throw new ApiError('Cannot reach the server. Please try again.', 0);
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || `Request failed (${res.status})`, res.status);
  }
  return res.json();
}

export const getArticles = () => request('/articles').then((r) => r.articles);
export const getArticle = (slug) => request(`/articles/${encodeURIComponent(slug)}`).then((r) => r.article);
export const getCategoryArticles = (id) => request(`/categories/${encodeURIComponent(id)}`).then((r) => r.articles);
export const getHealth = () => request('/health');
