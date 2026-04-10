import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, ArrowRight, BookOpen, FileSpreadsheet, Presentation, X, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const resources = [
  {
    id: 1,
    title: 'Báo cáo Toàn cảnh: Kỷ nguyên AI trong Sales & Marketing',
    description: 'Từ Tối ưu hóa Cục bộ đến Tái cấu trúc Toàn diện. Tổng hợp dữ liệu thực chứng từ hơn 200 dự án B2B toàn cầu.',
    type: 'Report',
    icon: <Presentation className="w-6 h-6 text-emerald-600" />,
    image: 'https://i.ibb.co/jdvfP4T/Screenshot-2026-04-04-at-11-36-59.png',
    link: 'https://drive.google.com/file/d/1pckMZmQLWEQjYS5cXQXDSNF_fITfgjPh/view?usp=sharing'
  },
  {
    id: 2,
    title: 'Content B2B AI Prompt Playbook',
    description: 'Bộ câu lệnh (prompt) AI tối ưu nhất để tạo nội dung B2B chất lượng cao, thu hút khách hàng.',
    type: 'Playbook',
    icon: <FileText className="w-6 h-6 text-emerald-600" />,
    image: 'https://i.ibb.co/Hphh1SfK/Screenshot-2026-04-04-at-16-42-40.png',
    link: 'https://drive.google.com/file/d/1yVhhqORxnMSZhfgmP4ptr-0K3Lwd9zTE/view?usp=sharing'
  },
  {
    id: 3,
    title: 'Biểu đồ tăng trưởng B2B',
    description: 'Bản đồ chi tiết các giai đoạn và chiến lược tăng trưởng dành riêng cho doanh nghiệp B2B.',
    type: 'Framework',
    icon: <FileSpreadsheet className="w-6 h-6 text-emerald-600" />,
    image: 'https://i.ibb.co/PsGjR7KC/Screenshot-2026-04-04-at-16-44-24.png',
    link: 'https://drive.google.com/file/d/1TnMqAze1ChV_84QoDBcIO2ku_kLvpoP2/view?usp=sharing'
  },
  {
    id: 4,
    title: 'Những sai lầm trong triển khai marketing B2B',
    description: 'Phân tích các cạm bẫy phổ biến và cách phòng tránh khi thực thi chiến dịch B2B Marketing.',
    type: 'Guide',
    icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
    image: 'https://i.ibb.co/sd9wFrCH/Screenshot-2026-04-04-at-16-45-36.png',
    link: 'https://drive.google.com/file/d/1oa6ymhyU1avhsnzC0AordfiKdv5mD0Te/view?usp=sharing'
  }
];

export default function Resources() {
  const [selectedResource, setSelectedResource] = useState<typeof resources[0] | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent, resource: typeof resources[0]) => {
    e.preventDefault();
    setSelectedResource(resource);
    setIsSuccess(false);
    setEmail('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResource || !email) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'resource_downloads'), {
        email,
        resourceTitle: selectedResource.title,
        createdAt: serverTimestamp()
      });
      
      setIsSuccess(true);
      // Open the link in a new tab
      window.open(selectedResource.link, '_blank', 'noopener,noreferrer');
      
      // Close modal after a short delay
      setTimeout(() => {
        setSelectedResource(null);
      }, 3000);
    } catch (error) {
      console.error('Error recording download:', error);
      // Still open the link even if tracking fails so user isn't blocked
      window.open(selectedResource.link, '_blank', 'noopener,noreferrer');
      setSelectedResource(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center">
              <img src="https://i.ibb.co/ynwgXj1L/Logo-Convertx.png" alt="ConvertX Logo" className="h-10 w-auto" referrerPolicy="no-referrer" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                Trang chủ
              </Link>
              <Link to="/webinar" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                Webinar
              </Link>
              <a href="#resources-list" className="bg-emerald-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
                Khám phá ngay
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-sm mb-6 border border-emerald-500/20">
              <FileText className="w-4 h-4" />
              Tài nguyên Miễn phí
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Thư viện Tài nguyên <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Tăng trưởng B2B</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Khám phá các báo cáo, biểu mẫu, cẩm nang và tài liệu chuyên sâu giúp doanh nghiệp B2B của bạn tối ưu hóa phễu khách hàng và mở rộng quy mô.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources List */}
      <section id="resources-list" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div 
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group flex flex-col"
              >
                <div className="relative aspect-video bg-slate-100 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={resource.image} 
                    alt={resource.title} 
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm">
                    {resource.icon}
                    {resource.type}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 mb-6 flex-grow">
                    {resource.description}
                  </p>
                  
                  <button 
                    onClick={(e) => handleDownloadClick(e, resource)}
                    className="inline-flex items-center justify-center gap-2 w-full bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-semibold py-3 px-4 rounded-xl border border-slate-200 hover:border-emerald-200 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Tải xuống miễn phí
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bạn cần chiến lược tăng trưởng riêng biệt?</h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Đặt lịch tư vấn 1:1 với chuyên gia của chúng tôi để phân tích phễu khách hàng và xây dựng lộ trình tăng trưởng B2B cho doanh nghiệp của bạn.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg"
          >
            Liên hệ tư vấn ngay
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 border-t border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ConvertX. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Download Modal */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => !isSubmitting && setSelectedResource(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedResource(null)}
                disabled={isSubmitting}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Đăng ký thành công!</h3>
                    <p className="text-slate-600 mb-6">Tài liệu đang được mở trong tab mới.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                        <Download className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Tải tài liệu</h3>
                      <p className="text-slate-600">
                        Vui lòng nhập email công ty để tải <span className="font-semibold text-slate-900">{selectedResource.title}</span>
                      </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="companyEmail" className="block text-sm font-medium text-slate-700 mb-1">
                          Email công ty <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="companyEmail"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang xử lý...
                          </span>
                        ) : (
                          'Tải xuống ngay'
                        )}
                      </button>
                      <p className="text-xs text-slate-500 text-center mt-4">
                        Bằng việc tải xuống, bạn đồng ý nhận thông tin cập nhật từ ConvertX. Bạn có thể hủy đăng ký bất cứ lúc nào.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
