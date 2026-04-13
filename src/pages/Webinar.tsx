import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Users, CheckCircle2, ArrowRight, PlayCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Webinar() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [notification, setNotification] = useState<{ name: string, time: string } | null>(null);

  useEffect(() => {
    const targetDate = new Date('2026-04-23T14:00:00+07:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fakeNames = ["Nguyễn Văn A", "Trần Thị B", "Lê Hoàng C", "Phạm Minh D", "Hoàng Ngọc E", "Vũ Đức F", "Đặng Thu G", "Bùi Quang H", "Ngô Thanh I", "Đỗ Văn K"];
    
    const showRandomNotification = () => {
      const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      setNotification({ name: randomName, time: "Vài giây trước" });

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    };

    const initialTimeout = setTimeout(showRandomNotification, 5000);

    const interval = setInterval(() => {
      showRandomNotification();
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    
    // Map fields to match the expected format in Google Apps Script
    const submitData = new FormData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const role = formData.get('role') as string;
    
    submitData.append('name', `${firstName} ${lastName}`.trim());
    submitData.append('email', formData.get('email') as string);
    submitData.append('phone', formData.get('phone') as string || 'N/A');
    submitData.append('company', formData.get('company') as string);
    submitData.append('challenge', `Role: ${role} - Webinar Registration`);
    submitData.append('formType', 'webinar_registration');
    
    try {
      const GOOGLE_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbxW029oCCiUgriRu-v988S6HPVnc6T5pVqgrChFnTop4qDLoBvcepn93ZldaePe5Dqg/exec'; 

      if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'YOUR_NEW_GOOGLE_SCRIPT_URL_HERE') {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: submitData
        });
      } else {
        // Simulate API call if no URL is provided yet
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Webinar Form data ready to be sent to Google Sheets:", Object.fromEntries(submitData.entries()));
      }
      
      setFormStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('success'); 
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
              <a href="#register" className="bg-emerald-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
                Đăng ký ngay
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-slate-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Webinar Độc Quyền Trực Tuyến
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Xây Dựng <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Cỗ Máy Tăng Trưởng Cho B2B Startup</span>
              </h1>
              
              <p className="text-2xl font-bold text-slate-800 mb-4">
                Từ chiến thuật đến tự động hoá với Agentic AI
              </p>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Cung cấp tư duy xây dựng phễu tăng trưởng liền mạch và cách ứng dụng Agentic AI để tự động hóa khâu thu thập, đánh giá (qualify) và chuyển giao lead.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-emerald-500">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Ngày tổ chức</p>
                    <p className="font-bold">Thứ năm, 23 Tháng 04, 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-emerald-500">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Thời gian</p>
                    <p className="font-bold">14:00 - 15:00 (GMT+7)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-emerald-500">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Đối tượng</p>
                    <p className="font-bold">Founders, C-levels, Sales & Marketing</p>
                  </div>
                </div>
              </div>

              <div className="mb-10 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-2">Đơn vị tổ chức</p>
                    <p className="font-bold text-slate-900">ConvertX</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-2">Đơn vị đồng hành</p>
                    <p className="font-bold text-slate-900">MoodBiz, InCard</p>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="flex gap-4 mb-8">
                <div className="flex flex-col items-center justify-center bg-white border border-slate-100 shadow-sm rounded-2xl w-20 h-20">
                  <span className="text-2xl font-bold text-emerald-600">{timeLeft.days}</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Ngày</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white border border-slate-100 shadow-sm rounded-2xl w-20 h-20">
                  <span className="text-2xl font-bold text-emerald-600">{timeLeft.hours}</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Giờ</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white border border-slate-100 shadow-sm rounded-2xl w-20 h-20">
                  <span className="text-2xl font-bold text-emerald-600">{timeLeft.minutes}</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Phút</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white border border-slate-100 shadow-sm rounded-2xl w-20 h-20">
                  <span className="text-2xl font-bold text-emerald-600">{timeLeft.seconds}</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Giây</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#register" className="inline-flex justify-center items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/30 hover:-translate-y-1">
                  Giữ chỗ ngay miễn phí
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-2xl"></div>
              <div className="relative rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src="https://i.ibb.co/My0WTfn6/Event-Page-Webinar-1200-x-628-px.png" 
                  alt="Webinar Banner" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline sự kiện */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Khung chương trình chi tiết</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="font-bold text-emerald-600">1</span>
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">Phần 1: Khởi động & Nhận diện "Lỗ hổng" tăng trưởng</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li>• Thực trạng: Tăng trưởng B2B không chết vì thiếu cơ hội, mà chết vì đứt gãy quy trình vận hành.</li>
                  <li>• Khoảng trống doanh thu: Phân tích sự chênh lệch giữa lượng Lead từ Marketing và cơ hội bán hàng thực tế do phản hồi chậm hoặc không có hệ thống nuôi dưỡng.</li>
                  <li>• Chi phí ẩn: Minh họa chi phí của việc bỏ lỡ lead (ví dụ: mất 5 lead/ngày tương đương lãng phí ngân sách Marketing cho 150 lead/tháng).</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="font-bold text-emerald-600">2</span>
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">Phần 2: Chiến thuật Growth Engine & Tối ưu hành trình khách hàng</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li>• Chia sẻ kinh nghiệm B2B Growth kết hợp giữa xây dựng Định vị truyền thông, Kế hoạch truyền thông và Vòng lặp tăng trưởng bền vững.</li>
                  <li>• Khung Tăng trưởng dựa trên dữ liệu (Data-driven Insights): Cách sử dụng dữ liệu để thấu hiểu "điểm rơi" của khách hàng trong phễu B2B.</li>
                  <li>• Case study đã triển khai ở tech startup</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="font-bold text-emerald-600">3</span>
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">Phần 3: Tự động hóa Phễu B2B bằng Agentic AI</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li>• Giải pháp Agentic AI: AI không thay thế con người mà giải phóng Sales khỏi các công việc lặp lại (trả lời FAQ, thu thập thông tin cơ bản).</li>
                  <li>• Demo Thực tế: Trình diễn luồng xử lý lead tự động: Khách vào website → AI tư vấn & qualify → Đặt lịch họp → Chuyển dữ liệu về CRM.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="font-bold text-emerald-600">4</span>
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-lg mb-2">Phần 4: Q&A</h3>
                <p className="text-slate-600 text-sm">
                  Giải đáp thắc mắc trực tiếp từ người tham dự và hướng dẫn các bước tiếp theo để áp dụng vào doanh nghiệp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quà tặng độc quyền */}
      <section className="py-24 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <Star className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Quà tặng độc quyền</h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              Khi tham gia event anh chị sẽ được gửi tặng 02 tài liệu độc quyền được chuẩn hóa và biên soạn đang áp dụng cho hệ thống của mình:
            </p>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Tài liệu B2B Growth Blueprint</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">ContentB2B_AI_Prompt_Playbook</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Các webinar đã diễn ra */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Các webinar đã diễn ra</h2>
            <p className="text-lg text-slate-600">Xem lại các sự kiện trực tuyến chất lượng từ ConvertX.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/webinar/xay-dung-co-may-tang-truong-b2b" className="group flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-emerald-200 transition-all">
              <div className="relative aspect-[1200/628] overflow-hidden">
                <img 
                  src="https://i.ibb.co/My0WTfn6/Event-Page-Webinar-1200-x-628-px.png" 
                  alt="Xây Dựng Cỗ Máy Tăng Trưởng B2B" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4 text-emerald-500" />
                  Xem lại
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  Xây Dựng Cỗ Máy Tăng Trưởng B2B
                </h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
                  Từ chiến lược Marketing đến tự động hóa bằng AI. Khám phá cách tạo Inbound Lead và tự động hóa quy trình bán hàng.
                </p>
                <div className="flex items-center text-emerald-600 font-semibold text-sm mt-auto">
                  Xem chi tiết
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-24 bg-slate-50 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Đăng ký tham dự miễn phí</h2>
              <p className="text-slate-600">Số lượng giới hạn 50 người tham dự để đảm bảo chất lượng Q&A.</p>
            </div>

            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Đăng ký thành công!</h3>
                <p className="text-slate-600 mb-8">Chúng tôi đã gửi link tham dự webinar vào email của bạn. Vui lòng kiểm tra hộp thư (kể cả thư mục Spam).</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-emerald-600 font-medium hover:text-emerald-700"
                >
                  Đăng ký cho người khác
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">Họ và tên đệm</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Nguyễn Văn"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Tên</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="A"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email công việc</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="name@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="+84..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">Tên công ty</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Công ty TNHH ABC"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">Chức vụ</label>
                  <select 
                    id="role" 
                    name="role"
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                  >
                    <option value="">Chọn chức vụ của bạn</option>
                    <option value="ceo">CEO / Founder</option>
                    <option value="marketing">Marketing Director / Manager</option>
                    <option value="sales">Sales Director / Manager</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </span>
                  ) : (
                    'Đăng ký tham dự ngay'
                  )}
                </button>
                <p className="text-xs text-slate-500 text-center mt-4">
                  Bằng việc đăng ký, bạn đồng ý nhận thông tin cập nhật từ ConvertX. Bạn có thể hủy đăng ký bất cứ lúc nào.
                </p>
              </form>
            )}
          </div>
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

      {/* Fake Registration Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900"><span className="font-bold">{notification.name}</span> vừa đăng ký</p>
              <p className="text-xs text-slate-500">{notification.time}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
