import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone } from 'lucide-react';
import CookieConsent from './CookieConsent';
import type { Language } from '../lib/useLanguage';

type SiteChromeProps = {
  lang: Language;
  onToggleLang: () => void;
  children: React.ReactNode;
};

const copy = {
  en: {
    home: 'Home',
    events: 'Events',
    resources: 'Resources',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    rights: 'All rights reserved.',
    address: 'District 3, Ho Chi Minh City',
    lang: 'VI',
    menu: 'Menu',
  },
  vi: {
    home: 'Trang chủ',
    events: 'Sự kiện',
    resources: 'Tài nguyên',
    about: 'Về chúng tôi',
    contact: 'Liên hệ',
    privacy: 'Chính sách bảo mật',
    terms: 'Điều khoản dịch vụ',
    rights: 'Bảo lưu mọi quyền.',
    address: 'Quận 3, TP. Hồ Chí Minh',
    lang: 'EN',
    menu: 'Menu',
  },
} as const;

export default function SiteChrome({ lang, onToggleLang, children }: SiteChromeProps) {
  const t = copy[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const close = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center">
              <img src="https://i.ibb.co/ynwgXj1L/Logo-Convertx.png" alt="ConvertX Logo" className="h-10 w-auto" referrerPolicy="no-referrer" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">{t.home}</Link>
              <Link to="/about" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">{t.about}</Link>
              {lang === 'en' && <a href="/en/pricing" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Pricing</a>}
              <Link to="/webinar" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">{t.events}</Link>
              <Link to="/resources" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">{t.resources}</Link>
              <button
                type="button"
                onClick={onToggleLang}
                className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 font-medium transition-colors px-3 py-1 rounded-full border border-slate-200 hover:border-emerald-200"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs uppercase">{t.lang}</span>
              </button>
              <a href="/#contact" className="bg-emerald-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
                {t.contact}
              </a>
            </div>
            <button
              type="button"
              className="md:hidden text-slate-600 hover:text-slate-900"
              aria-expanded={isMenuOpen}
              aria-label={t.menu}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-3 space-y-1">
              <Link to="/" onClick={close} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 rounded-md">{t.home}</Link>
              <Link to="/about" onClick={close} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 rounded-md">{t.about}</Link>
              {lang === 'en' && <a href="/en/pricing" onClick={close} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 rounded-md">Pricing</a>}
              <Link to="/webinar" onClick={close} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 rounded-md">{t.events}</Link>
              <Link to="/resources" onClick={close} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 rounded-md">{t.resources}</Link>
              <button type="button" onClick={() => { onToggleLang(); close(); }} className="w-full text-left px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 rounded-md">
                {lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
              </button>
              <a href="/#contact" onClick={close} className="block px-3 py-2 text-emerald-600 font-medium rounded-md">{t.contact}</a>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div>
              <Link to="/" className="inline-flex mb-4">
                <img src="https://i.ibb.co/ynwgXj1L/Logo-Convertx.png" alt="ConvertX Logo" className="h-12 w-auto rounded" />
              </Link>
              <p className="text-sm">{t.address}</p>
            </div>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">{t.about}</Link></li>
              {lang === 'en' && <li><a href="/en/pricing" className="hover:text-white transition-colors">Pricing</a></li>}
              <li><a href="/#contact" className="hover:text-white transition-colors">{t.contact}</a></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">{t.privacy}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">{t.terms}</Link></li>
            </ul>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:bao.ngo@convertx.biz" className="hover:text-white transition-colors">bao.ngo@convertx.biz</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+84908734657" className="hover:text-white transition-colors">+84 908734657</a>
              </li>
            </ul>
          </div>
          <p className="pt-8 mt-8 border-t border-slate-800 text-sm">&copy; {new Date().getFullYear()} ConvertX. {t.rights}</p>
        </div>
      </footer>
      <CookieConsent lang={lang} />
    </div>
  );
}
