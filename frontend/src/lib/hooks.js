import { useCallback, useEffect, useState } from 'react';

/** Runs an async function and tracks { data, error, loading }. Re-runs when deps change. */
export function useAsync(fn, deps = []) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, error: null, loading: true }));
    fn()
      .then((data) => !cancelled && setState({ data, error: null, loading: false }))
      .catch((error) => !cancelled && setState({ data: null, error, loading: false }));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

const THEME_KEY = 'algoforge-theme';

function initialTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'; // set by inline script in index.html
}

export function useTheme() {
  const [theme, setTheme] = useState(initialTheme);
  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      document.documentElement.style.colorScheme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* storage unavailable — theme just won't persist */
      }
      return next;
    });
  }, []);
  return { theme, toggle };
}
