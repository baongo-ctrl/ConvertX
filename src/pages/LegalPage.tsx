import Seo from '../components/Seo';
import SiteChrome from '../components/SiteChrome';
import type { LegalDocument } from '../content/legal';
import { useLanguage, type Language } from '../lib/useLanguage';

type LegalPageProps = {
  path: '/privacy' | '/terms';
  getDocument: (lang: Language) => LegalDocument;
};

export default function LegalPage({ path, getDocument }: LegalPageProps) {
  const [lang, toggleLang] = useLanguage();
  const doc = getDocument(lang);

  return (
    <SiteChrome lang={lang} onToggleLang={toggleLang}>
      <Seo title={doc.seoTitle} description={doc.seoDescription} path={path} lang={lang} />
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="inline-flex items-center rounded-full bg-amber-100 text-amber-950 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            {doc.kicker}
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-4">{doc.title}</h1>
          <p className="text-sm text-slate-500 mb-6">{doc.updated}</p>
          <div className="bg-amber-50 border border-amber-200 text-amber-950 rounded-2xl p-5 mb-10 text-sm leading-relaxed">
            {doc.draft}
          </div>
          <div className="space-y-10">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{section.heading}</h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-slate-700 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}
