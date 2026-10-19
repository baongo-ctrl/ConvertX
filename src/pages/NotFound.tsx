import { Link, useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import SiteChrome from '../components/SiteChrome';
import { useLanguage } from '../lib/useLanguage';

const copy = {
  en: {
    seoTitle: 'Page not found | ConvertX',
    seoDescription: 'This address is not a page on the ConvertX site.',
    title: 'Page not found',
    body: 'That address is not part of the ConvertX site.',
    home: 'Back to home',
    events: 'Events',
    resources: 'Resources',
    about: 'About',
  },
  vi: {
    seoTitle: 'Không tìm thấy trang | ConvertX',
    seoDescription: 'Địa chỉ này không phải một trang trên website ConvertX.',
    title: 'Không tìm thấy trang',
    body: 'Địa chỉ này không có trên website ConvertX.',
    home: 'Về trang chủ',
    events: 'Sự kiện',
    resources: 'Tài nguyên',
    about: 'Về chúng tôi',
  },
} as const;

export default function NotFound() {
  const [lang, toggleLang] = useLanguage();
  const location = useLocation();
  const t = copy[lang];

  return (
    <SiteChrome lang={lang} onToggleLang={toggleLang}>
      <Seo title={t.seoTitle} description={t.seoDescription} path={location.pathname} lang={lang} noindex />
      <section className="py-24">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="text-emerald-600 font-bold tracking-wide text-sm">404</p>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-3 mb-4">{t.title}</h1>
          <p className="text-slate-600 text-lg mb-8">{t.body}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="bg-emerald-500 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-emerald-600 transition-colors">{t.home}</Link>
            <Link to="/about" className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-full font-semibold hover:border-slate-300 transition-colors">{t.about}</Link>
            <Link to="/webinar" className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-full font-semibold hover:border-slate-300 transition-colors">{t.events}</Link>
            <Link to="/resources" className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-full font-semibold hover:border-slate-300 transition-colors">{t.resources}</Link>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
