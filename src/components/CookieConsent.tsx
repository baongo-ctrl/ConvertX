import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';

type Language = 'en' | 'vi';

interface CookieConsentProps {
  lang: Language;
}

const translations = {
  en: {
    title: 'We value your privacy',
    desc: 'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    manage: 'Manage Preferences',
    save: 'Save Preferences',
    preferencesTitle: 'Cookie Preferences',
    preferencesDesc: 'Manage your cookie settings. You can enable or disable different types of cookies below.',
    strictlyNecessary: 'Strictly Necessary',
    strictlyNecessaryDesc: 'These cookies are essential for the website to function properly. They cannot be disabled.',
    analytics: 'Analytics',
    analyticsDesc: 'These cookies help us understand how visitors interact with our website, helping us improve our services.',
    marketing: 'Marketing',
    marketingDesc: 'These cookies are used to track visitors across websites to display relevant advertisements.',
    alwaysActive: 'Always Active'
  },
  vi: {
    title: 'Chúng tôi tôn trọng quyền riêng tư của bạn',
    desc: 'Chúng tôi sử dụng cookie để nâng cao trải nghiệm duyệt web của bạn, phân phối quảng cáo hoặc nội dung được cá nhân hóa và phân tích lưu lượng truy cập. Bằng cách nhấp vào "Chấp nhận tất cả", bạn đồng ý với việc chúng tôi sử dụng cookie.',
    acceptAll: 'Chấp nhận tất cả',
    rejectAll: 'Từ chối tất cả',
    manage: 'Quản lý tùy chọn',
    save: 'Lưu tùy chọn',
    preferencesTitle: 'Tùy chọn Cookie',
    preferencesDesc: 'Quản lý cài đặt cookie của bạn. Bạn có thể bật hoặc tắt các loại cookie khác nhau bên dưới.',
    strictlyNecessary: 'Cực kỳ cần thiết',
    strictlyNecessaryDesc: 'Những cookie này rất cần thiết để trang web hoạt động bình thường. Chúng không thể bị vô hiệu hóa.',
    analytics: 'Phân tích',
    analyticsDesc: 'Những cookie này giúp chúng tôi hiểu cách khách truy cập tương tác với trang web, giúp chúng tôi cải thiện dịch vụ.',
    marketing: 'Tiếp thị',
    marketingDesc: 'Những cookie này được sử dụng để theo dõi khách truy cập trên các trang web nhằm hiển thị quảng cáo có liên quan.',
    alwaysActive: 'Luôn hoạt động'
  }
};

export default function CookieConsent({ lang }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false
  });

  const t = translations[lang];

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay so it doesn't pop up instantly on paint
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ analytics: true, marketing: true }));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ analytics: false, marketing: false }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && !showPreferences && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center pointer-events-auto">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full">
                  <Cookie className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                {t.desc}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                {t.manage}
              </button>
              <button
                onClick={handleRejectAll}
                className="px-5 py-2.5 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {t.rejectAll}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
              >
                {t.acceptAll}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {isVisible && showPreferences && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-emerald-600" />
                {t.preferencesTitle}
              </h3>
              <button 
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-slate-600 mb-6 text-sm">
                {t.preferencesDesc}
              </p>
              
              <div className="space-y-6">
                {/* Strictly Necessary */}
                <div className="flex gap-4">
                  <div className="mt-1">
                    <div className="w-10 h-6 bg-emerald-500 rounded-full relative opacity-50 cursor-not-allowed">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{t.strictlyNecessary}</h4>
                      <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">{t.alwaysActive}</span>
                    </div>
                    <p className="text-sm text-slate-600">{t.strictlyNecessaryDesc}</p>
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex gap-4">
                  <div className="mt-1">
                    <button 
                      onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                      className={`w-10 h-6 rounded-full relative transition-colors ${preferences.analytics ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.analytics ? 'translate-x-5' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{t.analytics}</h4>
                    <p className="text-sm text-slate-600">{t.analyticsDesc}</p>
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex gap-4">
                  <div className="mt-1">
                    <button 
                      onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                      className={`w-10 h-6 rounded-full relative transition-colors ${preferences.marketing ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.marketing ? 'translate-x-5' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{t.marketing}</h4>
                    <p className="text-sm text-slate-600">{t.marketingDesc}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={handleRejectAll}
                className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                {t.rejectAll}
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
              >
                {t.save}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
