import { useState } from 'react';

export type Language = 'en' | 'vi';

const STORAGE_KEY = 'cx-lang';

function readLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'vi') return saved;
  } catch {
    // Private mode can block storage. Vietnamese stays the default.
  }
  return 'vi';
}

export function useLanguage(): [Language, () => void] {
  const [lang, setLang] = useState<Language>(readLanguage);

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
