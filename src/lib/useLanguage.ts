import { useEffect, useState } from 'react';

export type Language = 'en' | 'vi';

const STORAGE_KEY = 'cx-lang';

function queryLanguage(): Language | null {
  const value = new URLSearchParams(window.location.search).get('lang');
  return value === 'en' || value === 'vi' ? value : null;
}

function readLanguage(): Language {
  try {
    const fromQuery = queryLanguage();
    if (fromQuery) return fromQuery;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'vi') return saved;
  } catch {
    // Private mode can block storage. Vietnamese stays the default.
  }
  return 'vi';
}

export function useLanguage(): [Language, () => void] {
  const [lang, setLang] = useState<Language>(readLanguage);

  useEffect(() => {
    let fromQuery: Language | null = null;
    try {
      fromQuery = queryLanguage();
    } catch {
      return;
    }
    if (!fromQuery) return;
    try {
      localStorage.setItem(STORAGE_KEY, fromQuery);
    } catch {
      // The query still selects the language for this visit.
    }
    setLang(fromQuery);
    const params = new URLSearchParams(window.location.search);
    params.delete('lang');
    const search = params.toString();
    const next = window.location.pathname + (search ? `?${search}` : '') + window.location.hash;
    window.history.replaceState(null, '', next);
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next: Language = prev === 'en' ? 'vi' : 'en';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore quota and private-mode failures.
      }
      return next;
    });
  };

  return [lang, toggle];
}
