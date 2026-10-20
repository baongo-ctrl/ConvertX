import { useLayoutEffect, useState } from 'react';

export type Language = 'en' | 'vi';

const STORAGE_KEY = 'cx-lang';
const ENGLISH_HOME = '/en';

function queryLanguage(): Language | null {
  try {
    const value = new URLSearchParams(window.location.search).get('lang');
    return value === 'en' || value === 'vi' ? value : null;
  } catch {
    return null;
  }
}

function readStoredLanguage(): Language | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'vi' ? saved : null;
  } catch {
    return null;
  }
}

function readLanguage(): Language {
  return queryLanguage() ?? readStoredLanguage() ?? 'vi';
}

function remember(language: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Private mode can block storage.
  }
}

function onVietnameseHome(): boolean {
  const path = window.location.pathname;
  return path === '/' || path === '';
}

/** The English homepage is the static /en page. Keep the SPA preference Vietnamese so VI → / stays there. */
function leaveForEnglishHome() {
  remember('vi');
  window.location.assign(ENGLISH_HOME);
}

export function useLanguage(): [Language, () => void] {
  const [lang, setLang] = useState<Language>(readLanguage);

  useLayoutEffect(() => {
    const fromQuery = queryLanguage();

    if (onVietnameseHome() && (fromQuery === 'en' || (fromQuery !== 'vi' && lang === 'en'))) {
      remember('vi');
      window.location.replace(ENGLISH_HOME);
      return;
    }

    if (!fromQuery) return;
    remember(fromQuery);
    setLang(fromQuery);
    const params = new URLSearchParams(window.location.search);
    params.delete('lang');
    const search = params.toString();
    const next = window.location.pathname + (search ? `?${search}` : '') + window.location.hash;
    window.history.replaceState(null, '', next);
  }, [lang]);

  const toggle = () => {
    setLang((prev) => {
      if (prev !== 'en') {
        leaveForEnglishHome();
        return prev;
      }
      remember('vi');
      return 'vi';
    });
  };

  return [lang, toggle];
}
