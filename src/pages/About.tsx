import Seo from '../components/Seo';
import SiteChrome from '../components/SiteChrome';
import { getAbout } from '../content/about';
import { useLanguage } from '../lib/useLanguage';

export default function About() {
  const [lang, toggleLang] = useLanguage();
  const t = getAbout(lang);

  return (
    <SiteChrome lang={lang} onToggleLang={toggleLang}>
      <Seo title={t.seoTitle} description={t.seoDescription} path="/about" lang={lang} />
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">{t.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-3">{t.title}</h1>
          <p className="text-lg text-slate-300 mt-6 leading-relaxed">{t.mission}</p>
          <p className="text-slate-400 mt-4">{t.identity}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.advantageTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.advantages.map((item) => (
              <article key={item.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.landscapeTitle}</h2>
          <ul className="space-y-4">
            {t.landscape.map((item) => (
              <li key={item} className="flex gap-3 text-slate-700 leading-relaxed">
                <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.industriesTitle}</h2>
          <ul className="flex flex-wrap gap-3 mb-12">
            {t.industries.map((item) => (
              <li key={item} className="bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700">
                {item}
              </li>
            ))}
          </ul>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{t.clientsTitle}</h2>
          <p className="text-slate-600 mb-6">{t.clientsNote}</p>
          <ul className="flex flex-wrap gap-3">
            {t.clients.map((item) => (
              <li key={item} className="bg-slate-900 text-white rounded-full px-4 py-2 text-sm font-medium">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-slate-500 mt-8 text-sm">
            <span className="font-semibold text-slate-700">{t.locationTitle}: </span>
            {t.location}
          </p>
        </div>
      </section>

      <section className="py-16 bg-emerald-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-emerald-50 text-lg mb-8">{t.ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="inline-flex justify-center bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors">
              {t.ctaPrimary}
            </a>
            <a href="/#pricing" className="inline-flex justify-center border border-white/70 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
