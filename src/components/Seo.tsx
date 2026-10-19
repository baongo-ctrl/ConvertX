import { useEffect } from 'react';

const SITE = 'https://convertx.biz';
const DEFAULT_IMAGE = 'https://i.ibb.co/ynwgXj1L/Logo-Convertx.png';

type SeoProps = {
  title: string;
  description: string;
  path: string;
  lang?: 'en' | 'vi';
  noindex?: boolean;
};

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function canonicalUrl(path: string): string {
  if (path === '/' || path === '') return `${SITE}/`;
  return `${SITE}${path.startsWith('/') ? path : `/${path}`}`;
}

export default function Seo({ title, description, path, lang = 'vi', noindex = false }: SeoProps) {
  useEffect(() => {
    const url = canonicalUrl(path);
    document.title = title;
    document.documentElement.lang = lang === 'en' ? 'en' : 'vi';

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:image', DEFAULT_IMAGE);
    upsertMeta('property', 'og:site_name', 'ConvertX');
    upsertMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'vi_VN');
    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [title, description, path, lang, noindex]);

  return null;
}
