/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe,
  LineChart,
  Mail,
  MessageSquare,
  Phone,
  Target,
  Users,
  Zap,
  X,
  Download,
  FileText,
  PlayCircle,
  Video
} from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import LiveChat from '../components/LiveChat';
import CookieConsent from '../components/CookieConsent';
import LeadMagnetContent from '../components/LeadMagnetContent';

type Language = 'en' | 'vi';

const translations = {
  en: {
    nav: {
      services: 'Services',
      caseStudies: 'Case Studies',
      testimonials: 'Testimonials',
      resources: 'Resources',
      getQuote: 'Get a Quote'
    },
    hero: {
      badge: 'B2B Growth Partner',
      title: 'Turn Your B2B Expertise Into a ',
      titleAccent: 'Predictable Growth Engine.',
      desc: 'ConvertX helps B2B SaaS, B2B eCommerce, Edtech, and Professional Service companies build authority, generate qualified leads, and scale revenue.',
      ctaPrimary: 'Book Your Strategy Call',
      ctaSecondary: 'Explore Services',
      socialProof: 'Trusted by 50+ fast-growing companies',
      satisfactionStat: '98% client satisfaction rate & 2.5x average pipeline growth'
    },
    logos: {
      title: 'Trusted by B2B Innovators',
      stat1: 'Monthly Website Visits',
      stat2: 'Qualified Leads / Month',
      stat3: 'Lead Conversion Rate',
      stat4: 'Year Event Series'
    },
    problems: {
      badge: 'The Challenge',
      title: 'Why B2B Growth Stalls',
      desc: 'We understand the unique hurdles B2B companies face when trying to scale.',
      p1Title: 'Inconsistent Pipeline',
      p1Desc: 'No predictable system for generating qualified B2B leads.',
      p2Title: 'Weak Positioning',
      p2Desc: 'Great product but struggling to stand out in the market.',
      p3Title: 'Unmeasurable ROI',
      p3Desc: 'Growth activities not translating into clear revenue.',
      p4Title: 'Hidden Expertise',
      p4Desc: 'Founder expertise not yet converted into brand authority.'
    },
    servicesSection: {
      badge: 'ConvertX Solutions',
      title: 'Everything you need to scale',
      desc: 'Comprehensive services tailored for B2B SaaS, B2B eCommerce, Edtech, and Professional Services.',
      learnMore: 'Learn more'
    },
    serviceModal: {
      included: 'What\'s Included',
      benefits: 'Key Benefits',
      ctaTitle: 'Ready to get started?',
      ctaDesc: 'Book a strategy call to discuss how {service} can help your business grow.',
      ctaButton: 'Book Your Strategy Call'
    },
    caseStudiesSection: {
      badge: 'Proven Results',
      title: 'Real numbers from real B2B companies',
      viewAll: 'View all case studies',
      readFull: 'Read full story'
    },
    caseStudyModal: {
      title: 'Full Success Story',
      challenge: 'The Challenge',
      solution: 'Our Solution',
      results: 'Key Results',
      ctaTitle: 'Want similar results for your business?',
      ctaDesc: 'Let\'s discuss how we can apply these strategies to your unique B2B challenges.',
      ctaButton: 'Book Your Strategy Call'
    },
    process: {
      badge: 'Our Process',
      title: 'How we drive growth',
      s1Title: 'Market Insight',
      s1Desc: 'Research industry, competitors, and positioning.',
      s2Title: 'Strategy Design',
      s2Desc: 'Define messaging, channels, and growth model.',
      s3Title: 'Execution',
      s3Desc: 'Deploy campaigns, content, and lead generation systems.',
      s4Title: 'Optimization',
      s4Desc: 'Track data and continuously improve conversion.'
    },
    packages: {
      badge: 'Packages',
      title: 'Transparent pricing for growth',
      desc: 'Baseline estimations. Final proposals are customized to your specific needs.',
      p1Title: 'B2B Launch Kit',
      p1Unit: 'USD / project',
      p1Desc: 'For early-stage startups building their growth foundation.',
      p2Title: 'Growth Engine',
      p2Unit: 'USD / month',
      p2Desc: 'For companies that need consistent B2B lead generation.',
      p3Title: 'Thought Leadership',
      p3Unit: 'USD / month',
      p3Desc: 'Build founder authority in the industry.',
      p4Title: 'CRM + Automation',
      p4Unit: 'USD / project',
      p4Desc: 'Improve sales pipeline efficiency.',
      popular: 'Most Popular',
      getDetails: 'Get Details'
    },
    testimonials: {
      badge: 'Testimonials',
      title: 'What Our Clients Say',
      desc: 'Hear from the B2B leaders who have partnered with ConvertX to scale their revenue.',
    },
    resourcesSection: {
      badge: 'Insights',
      title: 'B2B Growth Resources',
      desc: 'Strategies, tactics, and frameworks for scaling your B2B revenue.',
      viewAll: 'View All Resources'
    },
    webinars: {
      badge: 'Past Events',
      title: 'Learn from B2B Experts',
      desc: 'Watch our previous events and webinars on B2B growth, marketing, and sales strategies.',
      watchNow: 'View All Events'
    },
    contact: {
      title: 'Ready to Build Your B2B Growth Engine?',
      desc: 'Book a free strategy session with ConvertX to explore how we can help your business scale faster.',
      item1: 'Discuss your current pipeline challenges',
      item2: 'Explore tailored B2B strategies',
      item3: 'Review relevant case studies',
      item4: 'No obligation consultation',
      formTitle: 'Book a Strategy Call',
      labelName: 'Full Name',
      placeholderName: 'John Doe',
      labelEmail: 'Work Email',
      placeholderEmail: 'john@company.com',
      labelPhone: 'Phone Number',
      labelCompany: 'Company Name & Website',
      placeholderCompany: 'Acme Corp - acme.com',
      labelChallenge: 'Primary Challenge',
      placeholderChallenge: 'What is the main growth challenge you\'re facing right now?',
      submit: 'Book a Strategy Call',
      sending: 'Sending...',
      successTitle: 'Request Received!',
      successDesc: 'Thank you for reaching out. One of our growth strategists will get back to you within 24 hours to schedule your call.',
      submitAnother: 'Submit another inquiry',
      bonusTitle: 'Bonus: Free B2B Growth Playbook',
      bonusDesc: 'Book your strategy call today and get instant access to our exclusive 10-point B2B Growth Checklist to audit your current pipeline.',
      downloadTitle: 'Your Playbook is Ready!',
      downloadDesc: 'As promised, here is your free B2B Growth Playbook. Click below to download.',
      downloadButton: 'Download Playbook (PDF)'
    },
    footer: {
      desc: 'The B2B growth partner for high-growth B2B SaaS, B2B eCommerce, Edtech, and Professional Service companies. We build predictable revenue engines for your business.',
      services: 'Services',
      s1: 'B2B Launch Kit',
      s2: 'Growth Engine',
      s3: 'Thought Leadership',
      s4: 'CRM + Automation',
      s5: '',
      company: 'Company',
      c1: 'About Us',
      c2: 'Case Studies',
      c3: 'Careers',
      c4: 'Blog',
      c5: 'Contact',
      contact: 'Contact',
      address: 'District 3, Ho Chi Minh City',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  },
  vi: {
    nav: {
      services: 'Dịch vụ',
      caseStudies: 'Case Studies',
      testimonials: 'Đánh giá',
      resources: 'Tài nguyên',
      getQuote: 'Nhận báo giá'
    },
    hero: {
      badge: 'Đối Tác Tăng Trưởng B2B',
      title: 'Biến Chuyên Môn B2B Của Bạn Thành ',
      titleAccent: 'Cỗ Máy Tăng Trưởng Bền Vững.',
      desc: 'ConvertX giúp các doanh nghiệp B2B SaaS, B2B eCommerce, Edtech và Dịch vụ Chuyên nghiệp xây dựng vị thế vững chắc, tạo ra khách hàng tiềm năng chất lượng và mở rộng doanh thu.',
      ctaPrimary: 'Đặt lịch tư vấn chiến lược',
      ctaSecondary: 'Khám phá dịch vụ',
      socialProof: 'Được tin tưởng bởi hơn 50 công ty đang phát triển nhanh',
      satisfactionStat: 'Tỷ lệ hài lòng 98% & Tăng trưởng phễu khách hàng trung bình 2.5x'
    },
    logos: {
      title: 'Được tin tưởng bởi các nhà đổi mới B2B',
      stat1: 'Lượt truy cập hàng tháng',
      stat2: 'Khách hàng tiềm năng chất lượng / Tháng',
      stat3: 'Tỷ lệ chuyển đổi khách hàng',
      stat4: 'Chuỗi sự kiện đã tổ chức'
    },
    problems: {
      badge: 'Thách Thức',
      title: 'Tại Sao Tăng Trưởng B2B Trì Trệ',
      desc: 'Chúng tôi hiểu những trở ngại đặc thù mà các công ty B2B phải đối mặt khi cố gắng mở rộng quy mô.',
      p1Title: 'Phễu khách hàng không ổn định',
      p1Desc: 'Chưa có hệ thống tạo khách hàng tiềm năng B2B ổn định.',
      p2Title: 'Vị thế yếu',
      p2Desc: 'Sản phẩm tốt nhưng gặp khó khăn trong việc nổi bật trên thị trường.',
      p3Title: 'ROI không thể đo lường',
      p3Desc: 'Các hoạt động tăng trưởng không chuyển đổi thành doanh thu rõ ràng.',
      p4Title: 'Chuyên môn bị ẩn giấu',
      p4Desc: 'Chuyên môn của người sáng lập chưa được chuyển hóa thành uy tín thương hiệu.'
    },
    servicesSection: {
      badge: 'Giải Pháp ConvertX',
      title: 'Mọi thứ bạn cần để mở rộng quy mô',
      desc: 'Các dịch vụ toàn diện được thiết kế riêng cho lĩnh vực B2B SaaS, B2B eCommerce, Edtech và Dịch vụ Chuyên nghiệp.',
      learnMore: 'Tìm hiểu thêm'
    },
    serviceModal: {
      included: 'Những gì bao gồm',
      benefits: 'Lợi ích chính',
      ctaTitle: 'Sẵn sàng bắt đầu?',
      ctaDesc: 'Đặt lịch gọi chiến lược để thảo luận về cách {service} có thể giúp doanh nghiệp của bạn phát triển.',
      ctaButton: 'Đặt lịch tư vấn chiến lược'
    },
    caseStudiesSection: {
      badge: 'Kết Quả Đã Được Chứng Minh',
      title: 'Những con số thực tế từ các công ty B2B thực tế',
      viewAll: 'Xem tất cả case studies',
      readFull: 'Đọc toàn bộ câu chuyện'
    },
    caseStudyModal: {
      title: 'Câu Chuyện Thành Công Chi Tiết',
      challenge: 'Thách Thức',
      solution: 'Giải Pháp Của Chúng Tôi',
      results: 'Kết Quả Then Chốt',
      ctaTitle: 'Bạn muốn đạt được kết quả tương tự cho doanh nghiệp của mình?',
      ctaDesc: 'Hãy thảo luận về cách chúng tôi có thể áp dụng những chiến lược này vào các thách thức B2B đặc thù của bạn.',
      ctaButton: 'Đặt Lịch Tư Vấn Chiến Lược'
    },
    process: {
      badge: 'Quy Trình Của Chúng Tôi',
      title: 'Cách chúng tôi thúc đẩy tăng trưởng',
      s1Title: 'Hiểu Biết Thị Trường',
      s1Desc: 'Nghiên cứu ngành, đối thủ cạnh tranh và định vị.',
      s2Title: 'Thiết Kế Chiến Lược',
      s2Desc: 'Xác định thông điệp, kênh và mô hình tăng trưởng.',
      s3Title: 'Thực Thi',
      s3Desc: 'Triển khai các chiến dịch, nội dung và hệ thống tạo khách hàng tiềm năng.',
      s4Title: 'Tối Ưu Hóa',
      s4Desc: 'Theo dõi dữ liệu và liên tục cải thiện chuyển đổi.'
    },
    packages: {
      badge: 'Các Gói Dịch Vụ',
      title: 'Giá cả minh bạch cho sự tăng trưởng',
      desc: 'Ước tính cơ bản. Các đề xuất cuối cùng sẽ được tùy chỉnh theo nhu cầu cụ thể của bạn.',
      p1Title: 'Bộ Khởi Động B2B',
      p1Unit: 'USD / dự án',
      p1Desc: 'Dành cho các startup giai đoạn đầu đang xây dựng nền tảng tăng trưởng.',
      p2Title: 'Cỗ Máy Tăng Trưởng',
      p2Unit: 'USD / tháng',
      p2Desc: 'Dành cho các công ty cần tạo khách hàng tiềm năng B2B ổn định.',
      p3Title: 'Vị Thế Dẫn Đầu Tư Duy',
      p3Unit: 'USD / tháng',
      p3Desc: 'Xây dựng uy tín cho người sáng lập trong ngành.',
      p4Title: 'CRM & Tự Động Hóa',
      p4Unit: 'USD / dự án',
      p4Desc: 'Cải thiện hiệu quả phễu bán hàng.',
      popular: 'Phổ Biến Nhất',
      getDetails: 'Xem Chi Tiết'
    },
    testimonials: {
      badge: 'Đánh Giá',
      title: 'Khách Hàng Nói Gì Về Chúng Tôi',
      desc: 'Lắng nghe từ các nhà lãnh đạo B2B đã hợp tác với ConvertX để mở rộng doanh thu của họ.',
    },
    resourcesSection: {
      badge: 'Tài Nguyên',
      title: 'Tài Liệu Tăng Trưởng B2B',
      desc: 'Chiến lược, chiến thuật và framework để mở rộng doanh thu B2B của bạn.',
      viewAll: 'Xem tất cả tài nguyên'
    },
    webinars: {
      badge: 'Sự kiện đã tổ chức',
      title: 'Học Hỏi Từ Chuyên Gia B2B',
      desc: 'Xem lại các sự kiện và webinar trước đây của chúng tôi về chiến lược tăng trưởng, marketing và sales B2B.',
      watchNow: 'Xem tất cả sự kiện'
    },
    contact: {
      title: 'Sẵn Sàng Xây Dựng Cỗ Máy Tăng Trưởng B2B Của Bạn?',
      desc: 'Đặt lịch tư vấn chiến lược miễn phí với ConvertX để khám phá cách chúng tôi có thể giúp doanh nghiệp của bạn mở rộng quy mô nhanh hơn.',
      item1: 'Thảo luận về các thách thức phễu khách hàng hiện tại của bạn',
      item2: 'Khám phá các chiến lược B2B được may đo riêng',
      item3: 'Xem xét các case studies liên quan',
      item4: 'Tư vấn không ràng buộc',
      formTitle: 'Đặt Lịch Tư Vấn Chiến Lược',
      labelName: 'Họ và tên',
      placeholderName: 'Nguyễn Văn A',
      labelEmail: 'Email công việc',
      placeholderEmail: 'ten@congty.com',
      labelPhone: 'Số điện thoại',
      labelCompany: 'Tên công ty & Website',
      placeholderCompany: 'Công ty Acme - acme.com',
      labelChallenge: 'Thách thức chính',
      placeholderChallenge: 'Thách thức tăng trưởng chính mà bạn đang đối mặt hiện nay là gì?',
      submit: 'Đặt Lịch Tư Vấn Chiến Lược',
      sending: 'Đang gửi...',
      successTitle: 'Đã Nhận Yêu Cầu!',
      successDesc: 'Cảm ơn bạn đã liên hệ. Một trong những chuyên gia chiến lược tăng trưởng của chúng tôi sẽ phản hồi trong vòng 24 giờ để sắp xếp lịch hẹn.',
      submitAnother: 'Gửi yêu cầu khác',
      bonusTitle: 'Quà tặng: Cẩm nang Tăng trưởng B2B',
      bonusDesc: 'Đặt lịch gọi chiến lược ngay hôm nay và nhận quyền truy cập tức thì vào Danh sách kiểm tra 10 điểm Tăng trưởng B2B độc quyền của chúng tôi để đánh giá phễu khách hàng hiện tại của bạn.',
      downloadTitle: 'Cẩm nang của bạn đã sẵn sàng!',
      downloadDesc: 'Như đã hứa, đây là Cẩm nang Tăng trưởng B2B miễn phí của bạn. Nhấn vào bên dưới để tải xuống.',
      downloadButton: 'Tải xuống Cẩm nang (PDF)'
    },
    footer: {
      desc: 'Đối tác tăng trưởng B2B dành cho các doanh nghiệp B2B SaaS, B2B eCommerce, Edtech và Dịch vụ Chuyên nghiệp đang phát triển nhanh. Chúng tôi xây dựng cỗ máy doanh thu bền vững cho doanh nghiệp của bạn.',
      services: 'Dịch vụ',
      s1: 'Bộ Khởi Động B2B',
      s2: 'Cỗ Máy Tăng Trưởng',
      s3: 'Vị Thế Dẫn Đầu Tư Duy',
      s4: 'CRM & Tự Động Hóa',
      s5: '',
      company: 'Công ty',
      c1: 'Về chúng tôi',
      c2: 'Case Studies',
      c3: 'Tuyển dụng',
      c4: 'Blog',
      c5: 'Liên hệ',
      contact: 'Liên hệ',
      address: 'Quận 3, TP. Hồ Chí Minh',
      rights: 'Bảo lưu mọi quyền.',
      privacy: 'Chính sách bảo mật',
      terms: 'Điều khoản dịch vụ'
    }
  }
};

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  benefits: string[];
}

const getServices = (lang: Language): Service[] => [
  {
    icon: <Target className="w-6 h-6" />,
    title: lang === 'vi' ? 'Bộ Khởi Động B2B' : 'B2B Launch Kit',
    description: lang === 'vi' 
      ? 'Định vị thương hiệu, bộ nhận diện hình ảnh, trang đích và nền tảng CRM cho các startup giai đoạn đầu.'
      : 'Positioning, visual identity, landing pages, and CRM foundation for early-stage startups.',
    details: lang === 'vi' ? [
      'Workshop định vị 1:1',
      'Logo & Hướng dẫn thương hiệu',
      'Trang đích tỷ lệ chuyển đổi cao',
      'Thiết lập nền tảng CRM (HubSpot/Pipedrive)'
    ] : [
      '1:1 Positioning Workshop',
      'Logo & Brand Guidelines',
      'High-Conversion Landing Page',
      'CRM Foundation Setup (HubSpot/Pipedrive)'
    ],
    benefits: lang === 'vi' ? [
      'Xây dựng sự hiện diện chuyên nghiệp nhanh chóng',
      'Thống nhất thông điệp cốt lõi cho đội ngũ',
      'Cơ sở hạ tầng marketing sẵn sàng mở rộng'
    ] : [
      'Build professional presence fast',
      'Align core messaging for the team',
      'Scalable marketing infrastructure'
    ]
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: lang === 'vi' ? 'Cỗ Máy Tăng Trưởng' : 'Growth Engine',
    description: lang === 'vi'
      ? 'Inbound marketing, ABM, quảng cáo trả phí và tự động hóa email để tạo ra khách hàng tiềm năng ổn định.'
      : 'Inbound marketing, ABM, paid ads, and email automation to generate consistent leads.',
    details: lang === 'vi' ? [
      'Quản lý quảng cáo LinkedIn & Google',
      'Chiến lược Content Marketing',
      'Marketing dựa trên tài khoản (ABM)',
      'Chấm điểm & Nuôi dưỡng khách hàng tiềm năng'
    ] : [
      'LinkedIn & Google Ads Management',
      'Content Marketing Strategy',
      'Account-Based Marketing (ABM)',
      'Lead Scoring & Nurturing'
    ],
    benefits: lang === 'vi' ? [
      'Phễu khách hàng tiềm năng chất lượng ổn định',
      'Giảm chi phí sở hữu khách hàng',
      'Báo cáo và hiển thị toàn bộ phễu marketing'
    ] : [
      'Consistent qualified lead pipeline',
      'Lower customer acquisition cost',
      'Full-funnel visibility and reporting'
    ]
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: lang === 'vi' ? 'Vị Thế Dẫn Đầu Tư Duy' : 'Thought Leadership',
    description: lang === 'vi'
      ? 'Xây dựng thương hiệu cá nhân cho CEO thông qua nội dung chiến lược và PR để tạo uy tín trong ngành.'
      : 'CEO personal branding through strategic content and PR to build industry authority.',
    details: lang === 'vi' ? [
      'Viết nội dung LinkedIn chuyên sâu',
      'Tiếp cận PR & Truyền thông',
      'Chiến lược diễn thuyết tại sự kiện',
      'Xây dựng báo cáo chuyên sâu về ngành'
    ] : [
      'Deep-dive LinkedIn Content',
      'PR & Media Outreach',
      'Event Speaking Strategy',
      'Industry Whitepapers & Reports'
    ],
    benefits: lang === 'vi' ? [
      'Xây dựng niềm tin với những người ra quyết định cấp cao',
      'Rút ngắn chu kỳ bán hàng thông qua uy tín',
      'Thu hút nhân tài và đối tác hàng đầu'
    ] : [
      'Build trust with C-level decision makers',
      'Shorten sales cycles through authority',
      'Attract top-tier talent and partners'
    ]
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: lang === 'vi' ? 'Tăng Tốc Sự Kiện B2B' : 'B2B Event Accelerator',
    description: lang === 'vi'
      ? 'Webinar, sự kiện ngành và chiến lược tạo khách hàng tiềm năng thông qua đối tác.'
      : 'Webinars, industry events, and partner lead generation strategies.',
    details: lang === 'vi' ? [
      'Sản xuất & Quảng bá Webinar',
      'Quản lý sự kiện ngành',
      'Marketing hợp tác đối tác',
      'Nuôi dưỡng khách hàng sau sự kiện'
    ] : [
      'Webinar Production & Promotion',
      'Industry Event Management',
      'Partner Co-marketing',
      'Post-event Lead Nurturing'
    ],
    benefits: lang === 'vi' ? [
      'Tạo khách hàng tiềm năng có ý định mua hàng cao',
      'Làm sâu sắc mối quan hệ với các tài khoản trọng điểm',
      'Tối đa hóa ROI từ việc tài trợ sự kiện'
    ] : [
      'Generate high-intent leads',
      'Deepen key account relationships',
      'Maximize ROI from event sponsorships'
    ]
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: lang === 'vi' ? 'CRM & Tự Động Hóa' : 'CRM & Automation',
    description: lang === 'vi'
      ? 'Tự động hóa vòng đời khách hàng và tối ưu hóa quản lý phễu bán hàng.'
      : 'Customer lifecycle automation and sales pipeline optimization.',
    details: lang === 'vi' ? [
      'Kiểm định quy trình bán hàng',
      'Thiết kế quy trình tự động hóa',
      'Làm sạch dữ liệu CRM',
      'Thống nhất quy trình Bán hàng & Marketing'
    ] : [
      'Sales Process Audit',
      'Automation Workflow Design',
      'CRM Data Cleansing',
      'Sales & Marketing Alignment'
    ],
    benefits: lang === 'vi' ? [
      'Loại bỏ lỗi nhập liệu thủ công',
      'Thời gian phản hồi khách hàng nhanh hơn',
      'Cải thiện năng suất đội ngũ bán hàng'
    ] : [
      'Eliminate manual entry errors',
      'Faster lead response times',
      'Improved sales team productivity'
    ]
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: lang === 'vi' ? 'Nghiên Cứu Thị Trường' : 'Market Research',
    description: lang === 'vi'
      ? 'Phân tích sâu về ngành và chiến lược tái định vị thương hiệu.'
      : 'Deep industry analysis and brand repositioning strategies.',
    details: lang === 'vi' ? [
      'Phân tích đối thủ cạnh tranh',
      'Chương trình phỏng vấn khách hàng',
      'Báo cáo xu hướng thị trường',
      'Tinh chỉnh chiến lược GTM'
    ] : [
      'Competitor Landscape Analysis',
      'Customer Interview Programs',
      'Market Trend Reports',
      'GTM Strategy Refinement'
    ],
    benefits: lang === 'vi' ? [
      'Quyết định chiến lược dựa trên dữ liệu',
      'Xác định các cơ hội thị trường chưa được khai thác',
      'Luôn đi trước các thay đổi của ngành'
    ] : [
      'Data-driven strategic decisions',
      'Identify untapped market gaps',
      'Stay ahead of industry shifts'
    ]
  }
];

interface CaseStudy {
  company: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  fullStory: {
    challenge: string;
    solution: string;
    results: string[];
  };
}

const getCaseStudies = (lang: Language): CaseStudy[] => [
  {
    company: 'ClassIn',
    metric: '1M+',
    metricLabel: lang === 'vi' ? 'Lượt truy cập hàng tháng' : 'Monthly Website Visits',
    description: lang === 'vi'
      ? 'Tạo ra doanh thu hàng năm 1 triệu USD và tổ chức thành công chuỗi sự kiện kéo dài 3 năm cho đơn vị dẫn đầu EdTech này.'
      : 'Generated $1M ARR and successfully hosted a 3-year event series for this EdTech leader.',
    tags: lang === 'vi' ? ['EdTech', 'Sự kiện', 'SEO'] : ['EdTech', 'Events', 'SEO'],
    fullStory: {
      challenge: lang === 'vi'
        ? 'ClassIn cần thiết lập sự hiện diện mạnh mẽ tại thị trường Đông Nam Á và xây dựng phễu khách hàng tiềm năng ổn định từ các tổ chức.'
        : 'ClassIn needed to establish a dominant presence in the SE Asia market and build a consistent pipeline of institutional leads.',
      solution: lang === 'vi'
        ? 'Chúng tôi đã triển khai chiến lược tăng trưởng đa kênh tập trung vào nội dung chất lượng cao, tối ưu hóa SEO và chuỗi sự kiện hội nghị thường niên giúp định vị ClassIn là đơn vị dẫn đầu tư duy trong ngành EdTech.'
        : 'We deployed a multi-channel growth strategy focusing on high-quality content, SEO optimization, and an annual conference series that positioned ClassIn as a thought leader in EdTech.',
      results: lang === 'vi' ? [
        'Đạt hơn 1 triệu lượt truy cập website hàng tháng trong vòng 18 tháng',
        'Tạo ra 1 triệu USD doanh thu hàng năm được ghi nhận trực tiếp',
        'Thực hiện thành công 3 năm liên tiếp hội nghị thượng đỉnh "Tương lai Giáo dục"'
      ] : [
        'Reached 1M+ monthly website visits within 18 months',
        'Generated $1M in directly attributed annual revenue',
        'Successfully executed 3 consecutive years of "Future of Education" summits'
      ]
    }
  },
  {
    company: 'cirCO',
    metric: '200+',
    metricLabel: lang === 'vi' ? 'Khách hàng tiềm năng chất lượng / Tháng' : 'Qualified Leads / Month',
    description: lang === 'vi'
      ? 'Đạt tỷ lệ chuyển đổi từ khách hàng tiềm năng sang khách hàng thực tế là 18% thông qua các chiến lược tiếp cận B2B mục tiêu.'
      : 'Achieved an 18% lead-to-customer conversion rate through targeted B2B outreach strategies.',
    tags: lang === 'vi' ? ['Tạo Lead', 'Chuyển đổi'] : ['Lead Gen', 'Conversion'],
    fullStory: {
      challenge: lang === 'vi'
        ? 'Là một không gian làm việc chung hàng đầu, cirCO cần vượt xa các khách hàng vãng lai B2C và thu hút các tài khoản doanh nghiệp B2B giá trị cao.'
        : 'As a leading coworking space, cirCO needed to move beyond B2C walk-ins and attract high-value B2B corporate accounts.',
      solution: lang === 'vi'
        ? 'Chúng tôi đã phát triển chiến dịch LinkedIn ABM (Marketing dựa trên tài khoản) mục tiêu và tối ưu hóa quy trình nuôi dưỡng khách hàng để nhắm đến các trưởng bộ phận Nhân sự và Vận hành của các công ty công nghệ đang phát triển.'
        : 'We developed targeted LinkedIn ABM campaigns and optimized the lead nurturing process to reach HR and Ops heads of growing tech firms.',
      results: lang === 'vi' ? [
        'Tăng lượng khách hàng tiềm năng B2B lên 150% trong 6 tháng',
        'Duy trì tỷ lệ chuyển đổi ổn định ở mức 18%',
        'Giảm chi phí sở hữu khách hàng (CPA) xuống 40%'
      ] : [
        'Increased B2B lead volume by 150% in 6 months',
        'Maintained a steady 18% conversion rate',
        'Reduced Cost Per Acquisition (CPA) by 40%'
      ]
    }
  },
  {
    company: 'Geek Up',
    metric: lang === 'vi' ? 'Tin cậy' : 'Trusted',
    metricLabel: lang === 'vi' ? 'Đối tác Outsourcing' : 'Outsourcing Partner',
    description: lang === 'vi'
      ? 'Giúp định vị họ là đối tác tin cậy cho các tập đoàn lớn tại Việt Nam thông qua các chiến dịch dẫn đầu tư duy.'
      : 'Helped position them as a trusted partner for major Vietnamese corporations through thought leadership campaigns.',
    tags: lang === 'vi' ? ['Định vị', 'PR'] : ['Positioning', 'PR'],
    fullStory: {
      challenge: lang === 'vi'
        ? 'Geek Up sở hữu đội ngũ kỹ sư đẳng cấp thế giới nhưng thường bị coi là "chỉ là một xưởng outsourcing khác" thay vì một đối tác sản phẩm chiến lược.'
        : 'Geek Up had world-class engineering but was often perceived as "just another outsourcing shop" rather than a strategic product partner.',
      solution: lang === 'vi'
        ? 'Chúng tôi đã khởi động chương trình dẫn đầu tư duy toàn diện cho đội ngũ lãnh đạo, kết hợp với các vị trí PR chiến lược trên các ấn phẩm kinh doanh hàng đầu và các báo cáo ngành có tác động cao.'
        : 'We launched a comprehensive thought leadership program for the leadership team, combined with strategic PR placements in top business publications.',
      results: lang === 'vi' ? [
        'Thiết lập quan hệ đối tác với 3 trong số 10 tập đoàn hàng đầu Việt Nam',
        'Tăng lượng tìm kiếm thương hiệu lên 300%',
        'Tái định vị thành công thành "Đối tác Tác động Sản phẩm"'
      ] : [
        'Established partnerships with 3 of Vietnam\'s top 10 corporations',
        'Increased branded search volume by 300%',
        'Successfully repositioned as a "Product Impact Partner"'
      ]
    }
  }
];

const getTestimonials = (lang: Language) => [
  {
    id: 1,
    company: 'ClassIn',
    logo: 'https://i.ibb.co/YBWK4q9n/Class-In200.webp',
    quote: lang === 'vi' 
      ? "ConvertX đã thay đổi hoàn toàn phễu khách hàng của chúng tôi. Trong vòng 3 tháng, chúng tôi thấy số lượng bản demo chất lượng tăng 150% và chi phí thu hút khách hàng giảm đáng kể."
      : "ConvertX completely transformed our pipeline. Within 3 months, we saw a 150% increase in qualified demos and a significant drop in our customer acquisition cost."
  },
  {
    id: 2,
    company: 'cirCO',
    logo: 'https://i.ibb.co/KPVrND0/images-1.jpg',
    quote: lang === 'vi'
      ? "Đội ngũ tại ConvertX không chỉ chạy quảng cáo; họ xây dựng một cỗ máy tăng trưởng toàn diện. Cách tiếp cận chiến lược của họ đối với định vị B2B của chúng tôi là một bước ngoặt."
      : "The team at ConvertX doesn't just run ads; they build a comprehensive growth engine. Their strategic approach to our B2B positioning was a game-changer."
  },
  {
    id: 3,
    company: 'Wego',
    logo: 'https://i.ibb.co/jNSsWqK/images-2.jpg',
    quote: lang === 'vi'
      ? "Chúng tôi đã gặp khó khăn khi thâm nhập thị trường doanh nghiệp. ConvertX đã giúp chúng tôi tinh chỉnh thông điệp và triển khai chiến lược ABM mang lại 3 khách hàng Fortune 500."
      : "We were struggling to break into the enterprise market. ConvertX helped us refine our messaging and implemented an ABM strategy that landed us 3 Fortune 500 clients."
  }
];

export default function Home() {
  const [lang, setLang] = useState<Language>('vi');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const t = useMemo(() => translations[lang], [lang]);
  const services = useMemo(() => getServices(lang), [lang]);
  const caseStudies = useMemo(() => getCaseStudies(lang), [lang]);
  const testimonials = useMemo(() => getTestimonials(lang), [lang]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Toggle language
  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'vi' : 'en');
  };

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedService || selectedCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService, selectedCaseStudy]);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadLeadMagnet = async () => {
    setIsDownloading(true);
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');

      const element = document.getElementById('pdf-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(lang === 'en' ? 'B2B_Growth_Playbook.pdf' : 'Cam_nang_Tang_truong_B2B.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // TODO: Replace this URL with your actual Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzx3HtLaLphdm4kx81FhY7-nwm_pCQT0eQY6EQisBz5b-DtnlMiOfDfNG56fhEUoXim4w/exec'; 

      if (GOOGLE_SCRIPT_URL) {
        // Send data to Google Sheets via Apps Script
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        });
      } else {
        // Simulate API call if no URL is provided yet
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form data ready to be sent to Google Sheets:", data);
      }
      
      setFormStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Even if there's a CORS error (common with no-cors), we often still succeed in writing to the sheet
      setFormStatus('success'); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-2">
                <img src="https://i.ibb.co/ynwgXj1L/Logo-Convertx.png" alt="ConvertX Logo" className="h-16 w-auto rounded" />
              </a>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">{t.nav.services}</a>
              <a href="#case-studies" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">{t.nav.caseStudies}</a>
              <a href="#testimonials" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">{t.nav.testimonials}</a>
              <Link to="/resources" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">{t.nav.resources}</Link>
              <Link to="/webinar" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Webinar</Link>
              
              <button 
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 font-medium transition-colors px-3 py-1 rounded-full border border-slate-200 hover:border-emerald-200"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs uppercase">{lang === 'vi' ? 'EN' : 'VI'}</span>
              </button>

              <a href="#contact" className="bg-emerald-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-200">
                {t.nav.getQuote}
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none"
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
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 hover:bg-slate-50 rounded-md">{t.nav.services}</a>
              <a href="#case-studies" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 hover:bg-slate-50 rounded-md">{t.nav.caseStudies}</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 hover:bg-slate-50 rounded-md">{t.nav.testimonials}</a>
              <Link to="/resources" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 hover:bg-slate-50 rounded-md">{t.nav.resources}</Link>
              <Link to="/webinar" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 hover:bg-slate-50 rounded-md">Webinar</Link>
              <button 
                onClick={() => { toggleLang(); setIsMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-slate-600 font-medium hover:text-emerald-600 hover:bg-slate-50 rounded-md flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}</span>
              </button>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-emerald-600 font-medium hover:bg-emerald-50 rounded-md">{t.nav.getQuote}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section aria-label={t.hero.badge} className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center text-center">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-200 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-emerald-700 font-medium text-sm mb-8 border border-emerald-100 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t.hero.badge}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-8">
            {t.hero.title}<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">{t.hero.titleAccent}</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            {t.hero.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <a href="#contact" className="inline-flex justify-center items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:-translate-y-1">
              {t.hero.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#services" className="inline-flex justify-center items-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md">
              {t.hero.ctaSecondary}
            </a>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200/60 w-full max-w-3xl flex flex-col items-center gap-6">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t.hero.socialProof}</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale">
              {[
                { name: 'ClassIn', logo: 'https://i.ibb.co/YBWK4q9n/Class-In200.webp' },
                { name: 'Geek Up', logo: 'https://i.ibb.co/KpHM9R3N/gu-logo-general.png' },
                { name: 'Buymed', logo: 'https://i.ibb.co/Kz2bN7ds/1680581461122-buymed-horizontal-green-1.png' },
                { name: 'Zimlog', logo: 'https://i.ibb.co/Pv3tzBLJ/zyirklz8kotyzog8nqzy.png' }
              ].map((company, i) => (
                <img 
                  key={i}
                  src={company.logo} 
                  alt={`${company.name} Logo`} 
                  className="h-8 md:h-10 w-auto object-contain" 
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <span className="text-sm font-bold text-slate-700">{t.hero.satisfactionStat}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-16 w-full max-w-5xl mx-auto z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-3xl transform rotate-1 scale-105 -z-10"></div>
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 relative overflow-hidden">
            <img src="https://i.ibb.co/zVdLhC1X/1762957106629.jpg" alt="Vietnam B2B Fact" className="w-full h-auto rounded-2xl object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
          </div>
        </motion.div>
      </section>

      {/* Logos Section */}
      <section aria-label={t.logos.title} className="py-16 border-y border-slate-200 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-10">{t.logos.title}</p>
          
          <div className="relative overflow-hidden group mb-16 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {/* First set of logos */}
              <div className="flex items-center gap-12 md:gap-20 px-6 md:px-10 shrink-0">
                {[
                  { name: 'ClassIn', logo: 'https://i.ibb.co/YBWK4q9n/Class-In200.webp' },
                  { name: 'Geek Up', logo: 'https://i.ibb.co/KpHM9R3N/gu-logo-general.png' },
                  { name: 'Buymed', logo: 'https://i.ibb.co/Kz2bN7ds/1680581461122-buymed-horizontal-green-1.png' },
                  { name: 'Zimlog', logo: 'https://i.ibb.co/Pv3tzBLJ/zyirklz8kotyzog8nqzy.png' },
                  { name: 'InCard', logo: 'https://i.ibb.co/KpWbTvHb/incardbiz-logo-1.jpg', scaleClass: 'scale-150' },
                  { name: 'Wego', logo: 'https://i.ibb.co/jNSsWqK/images-2.jpg', scaleClass: 'scale-150' },
                  { name: 'Firegroup', logo: 'https://i.ibb.co/WNbK3HVk/Logo-full-red-dung.png', scaleClass: 'scale-150' },
                  { name: 'OKR Business', logo: 'https://i.ibb.co/ZzxvhwVn/1763978698175-Roundborderwhite.png', scaleClass: 'scale-150' },
                  { name: 'Dược Phẩm CT', logo: 'https://i.ibb.co/6cpcjNxj/IMG-0244.png', scaleClass: 'scale-150' }
                ].map((company, i) => (
                  <div key={i} className="flex items-center justify-center h-12 shrink-0 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} Logo`} 
                      className={`max-h-full w-auto object-contain ${company.scaleClass || ''}`} 
                      onError={(e) => {
                        // Fallback to text if logo fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }} 
                    />
                    <div className="hidden flex items-center gap-2 text-2xl font-bold text-slate-800">
                      <Globe className="w-8 h-8" />
                      {company.name}
                    </div>
                  </div>
                ))}
              </div>
              {/* Second set of logos for seamless loop */}
              <div className="flex items-center gap-12 md:gap-20 px-6 md:px-10 shrink-0">
                {[
                  { name: 'ClassIn', logo: 'https://i.ibb.co/YBWK4q9n/Class-In200.webp' },
                  { name: 'Geek Up', logo: 'https://i.ibb.co/KpHM9R3N/gu-logo-general.png' },
                  { name: 'Buymed', logo: 'https://i.ibb.co/Kz2bN7ds/1680581461122-buymed-horizontal-green-1.png' },
                  { name: 'Zimlog', logo: 'https://i.ibb.co/Pv3tzBLJ/zyirklz8kotyzog8nqzy.png' },
                  { name: 'InCard', logo: 'https://i.ibb.co/KpWbTvHb/incardbiz-logo-1.jpg', scaleClass: 'scale-150' },
                  { name: 'Wego', logo: 'https://i.ibb.co/jNSsWqK/images-2.jpg', scaleClass: 'scale-150' },
                  { name: 'Firegroup', logo: 'https://i.ibb.co/WNbK3HVk/Logo-full-red-dung.png', scaleClass: 'scale-150' },
                  { name: 'OKR Business', logo: 'https://i.ibb.co/ZzxvhwVn/1763978698175-Roundborderwhite.png', scaleClass: 'scale-150' },
                  { name: 'Dược Phẩm CT', logo: 'https://i.ibb.co/6cpcjNxj/IMG-0244.png', scaleClass: 'scale-150' }
                ].map((company, i) => (
                  <div key={`dup-${i}`} className="flex items-center justify-center h-12 shrink-0 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} Logo`} 
                      className={`max-h-full w-auto object-contain ${company.scaleClass || ''}`} 
                      onError={(e) => {
                        // Fallback to text if logo fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }} 
                    />
                    <div className="hidden flex items-center gap-2 text-2xl font-bold text-slate-800">
                      <Globe className="w-8 h-8" />
                      {company.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-t border-slate-100 pt-12">
            <div>
              <p className="text-4xl font-extrabold text-emerald-500 mb-2">1M+</p>
              <p className="text-sm text-slate-600 font-medium">{t.logos.stat1}</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-emerald-500 mb-2">200+</p>
              <p className="text-sm text-slate-600 font-medium">{t.logos.stat2}</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-emerald-500 mb-2">18%</p>
              <p className="text-sm text-slate-600 font-medium">{t.logos.stat3}</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-emerald-500 mb-2">{lang === 'vi' ? '3 Năm' : '3 Years'}</p>
              <p className="text-sm text-slate-600 font-medium">{t.logos.stat4}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section aria-label={t.problems.badge} className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-3">{t.problems.badge}</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">{t.problems.title}</h3>
            <p className="text-lg text-slate-400">{t.problems.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.problems.p1Title, desc: t.problems.p1Desc },
              { title: t.problems.p2Title, desc: t.problems.p2Desc },
              { title: t.problems.p3Title, desc: t.problems.p3Desc },
              { title: t.problems.p4Title, desc: t.problems.p4Desc }
            ].map((problem, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">{problem.title}</h4>
                <p className="text-slate-400">{problem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" aria-label={t.servicesSection.badge} className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-500 font-semibold tracking-wide uppercase text-sm mb-3">{t.servicesSection.badge}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.servicesSection.title}</h3>
            <p className="text-lg text-slate-600">{t.servicesSection.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  {t.servicesSection.learnMore} <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                  {selectedService.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{selectedService.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto">
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {selectedService.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {t.serviceModal.included}
                  </h4>
                  <ul className="space-y-3">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {t.serviceModal.benefits}
                  </h4>
                  <ul className="space-y-3">
                    {selectedService.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold">{idx + 1}</span>
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-emerald-900 mb-2">{t.serviceModal.ctaTitle}</h4>
                <p className="text-emerald-700 text-sm mb-4">{t.serviceModal.ctaDesc.replace('{service}', selectedService.title)}</p>
                <a 
                  href="#contact" 
                  onClick={() => setSelectedService(null)}
                  className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-200"
                >
                  {t.serviceModal.ctaButton}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Case Studies Section */}
      <section id="case-studies" aria-label={t.caseStudiesSection.badge} className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-3">{t.caseStudiesSection.badge}</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">{t.caseStudiesSection.title}</h3>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              {t.caseStudiesSection.viewAll} <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800 rounded-3xl p-8 md:p-10 border border-slate-700 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10">
                  <p className="text-slate-400 font-medium mb-6">{study.company}</p>
                  <div className="mb-8">
                    <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">{study.metric}</span>
                    <span className="block text-emerald-400 font-medium mt-2 text-lg">{study.metricLabel}</span>
                  </div>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-md">{study.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm font-medium border border-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSelectedCaseStudy(study)}
                    className="inline-flex items-center gap-2 text-white font-semibold hover:text-emerald-400 transition-colors"
                  >
                    {t.caseStudiesSection.readFull} <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCaseStudy(null)}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-800"
          >
            <div className="p-6 sm:p-8 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
              <div>
                <p className="text-emerald-400 font-medium text-sm uppercase tracking-wider mb-1">{selectedCaseStudy.company}</p>
                <h3 className="text-2xl font-bold text-white">{t.caseStudyModal.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedCaseStudy(null)}
                className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-2">
                  <div className="mb-8">
                    <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-3">{t.caseStudyModal.challenge}</h4>
                    <p className="text-slate-300 text-lg leading-relaxed">{selectedCaseStudy.fullStory.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-widest mb-3">{t.caseStudyModal.solution}</h4>
                    <p className="text-slate-300 text-lg leading-relaxed">{selectedCaseStudy.fullStory.solution}</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 h-fit">
                  <h4 className="text-white font-bold mb-4">{t.caseStudyModal.results}</h4>
                  <ul className="space-y-4">
                    {selectedCaseStudy.fullStory.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-12">
                {selectedCaseStudy.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-full text-sm font-medium border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="p-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white">
                <h4 className="text-2xl font-bold mb-4">{t.caseStudyModal.ctaTitle}</h4>
                <p className="text-emerald-50 mb-6 text-lg">{t.caseStudyModal.ctaDesc}</p>
                <a 
                  href="#contact" 
                  onClick={() => setSelectedCaseStudy(null)}
                  className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-lg"
                >
                  {t.caseStudyModal.ctaButton}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Testimonials Section */}
      <section id="testimonials" aria-label={t.testimonials.badge} className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-500 font-semibold tracking-wide uppercase text-sm mb-3">{t.testimonials.badge}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t.testimonials.title}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              {t.testimonials.desc}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden relative rounded-3xl bg-white shadow-xl border border-slate-100 p-8 md:p-12">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <img 
                  src={testimonials[currentTestimonial].logo} 
                  alt={`${testimonials[currentTestimonial].company} logo`} 
                  className="h-12 object-contain mb-8 grayscale opacity-70"
                />
                <div className="relative">
                  <svg className="absolute -top-6 -left-8 w-12 h-12 text-emerald-100 transform -scale-x-100" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-xl md:text-2xl font-medium text-slate-700 italic relative z-10 leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:scale-110 transition-all focus:outline-none z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:scale-110 transition-all focus:outline-none z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentTestimonial ? 'bg-emerald-500 w-8' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section aria-label={t.process.badge} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-500 font-semibold tracking-wide uppercase text-sm mb-3">{t.process.badge}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.process.title}</h3>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/8 right-1/8 h-0.5 bg-slate-200 -z-10"></div>
            {[
              { step: '01', title: t.process.s1Title, desc: t.process.s1Desc },
              { step: '02', title: t.process.s2Title, desc: t.process.s2Desc },
              { step: '03', title: t.process.s3Title, desc: t.process.s3Desc },
              { step: '04', title: t.process.s4Title, desc: t.process.s4Desc }
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-24 h-24 mx-auto bg-white border-4 border-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <span className="text-2xl font-bold text-emerald-500">{item.step}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section aria-label={t.packages.badge} className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-emerald-500 font-semibold tracking-wide uppercase text-sm mb-3">{t.packages.badge}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t.packages.title}</h3>
            <p className="text-lg text-slate-600">{t.packages.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.packages.p1Title, price: '$2,200–$3,000', unit: t.packages.p1Unit, desc: t.packages.p1Desc },
              { title: t.packages.p2Title, price: '$3,600–$7,200', unit: t.packages.p2Unit, desc: t.packages.p2Desc, featured: true },
              { title: t.packages.p3Title, price: '$1,600–$2,400', unit: t.packages.p3Unit, desc: t.packages.p3Desc },
              { title: t.packages.p4Title, price: '$1,200–$2,000', unit: t.packages.p4Unit, desc: t.packages.p4Desc }
            ].map((pkg, i) => (
              <div key={i} className={`bg-white rounded-2xl p-8 border ${pkg.featured ? 'border-emerald-500 shadow-lg relative' : 'border-slate-200 shadow-sm'}`}>
                {pkg.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {t.packages.popular}
                  </div>
                )}
                <h4 className="text-xl font-bold text-slate-900 mb-4">{pkg.title}</h4>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-slate-900">{pkg.price}</span>
                  <span className="block text-sm text-slate-500 font-medium mt-1">{pkg.unit}</span>
                </div>
                <p className="text-slate-600 text-sm mb-8">{pkg.desc}</p>
                <a href="#contact" className={`block text-center py-3 rounded-lg font-semibold transition-colors ${pkg.featured ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                  {t.packages.getDetails}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section id="webinars" aria-label={t.webinars.badge} className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-12 text-center max-w-4xl mx-auto border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-8 h-8" />
            </div>
            <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4 block">{t.webinars.badge}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">{t.webinars.title}</h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">{t.webinars.desc}</p>
            
            <Link 
              to="/webinar"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-emerald-500/30"
            >
              <PlayCircle className="w-5 h-5" />
              {t.webinars.watchNow}
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" aria-label={t.resourcesSection.badge} className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 text-center max-w-4xl mx-auto border border-slate-100 shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4 block">{t.resourcesSection.badge}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">{t.resourcesSection.title}</h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">{t.resourcesSection.desc}</p>
            
            <Link 
              to="/resources"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-emerald-500/30"
            >
              <FileText className="w-5 h-5" />
              {t.resourcesSection.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" aria-label={t.contact.formTitle} className="py-24 bg-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
            <div className="p-10 md:p-16 lg:w-1/2 bg-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">{t.contact.title}</h3>
                <p className="text-slate-300 text-lg mb-10">
                  {t.contact.desc}
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    t.contact.item1,
                    t.contact.item2,
                    t.contact.item3,
                    t.contact.item4
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{t.contact.bonusTitle}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {t.contact.bonusDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-10 md:p-16 lg:w-1/2 bg-white flex flex-col justify-center">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-3xl font-bold text-slate-900 mb-4">{t.contact.successTitle}</h4>
                  <p className="text-slate-600 text-lg mb-10">
                    {t.contact.successDesc}
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-8">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                      <FileText className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h5 className="text-xl font-bold text-slate-900 mb-2">{t.contact.downloadTitle}</h5>
                    <p className="text-slate-600 text-sm mb-6">
                      {t.contact.downloadDesc}
                    </p>
                    <button 
                      onClick={handleDownloadLeadMagnet}
                      disabled={isDownloading}
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-emerald-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isDownloading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {lang === 'en' ? 'Generating PDF...' : 'Đang tạo PDF...'}
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          {t.contact.downloadButton}
                        </>
                      )}
                    </button>
                  </div>

                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-slate-500 font-medium hover:text-slate-700 transition-colors underline underline-offset-4"
                  >
                    {t.contact.submitAnother}
                  </button>
                </motion.div>
              ) : (
                <>
                  <h4 className="text-2xl font-bold text-slate-900 mb-8">{t.contact.formTitle}</h4>
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">{t.contact.labelName}</label>
                      <input required type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder={t.contact.placeholderName} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">{t.contact.labelEmail}</label>
                        <input required type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder={t.contact.placeholderEmail} />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">{t.contact.labelPhone}</label>
                        <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder="+84..." />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">{t.contact.labelCompany}</label>
                      <input required type="text" id="company" name="company" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder={t.contact.placeholderCompany} />
                    </div>
                    <div>
                      <label htmlFor="challenge" className="block text-sm font-medium text-slate-700 mb-2">{t.contact.labelChallenge}</label>
                      <textarea required id="challenge" name="challenge" rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" placeholder={t.contact.placeholderChallenge}></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-emerald-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200 mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {formStatus === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t.contact.sending}
                        </span>
                      ) : (
                        t.contact.submit
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-6">
                <img src="https://i.ibb.co/ynwgXj1L/Logo-Convertx.png" alt="ConvertX Logo" className="h-16 w-auto rounded" />
              </a>
              <p className="text-slate-400 max-w-sm mb-6">
                {t.footer.desc}
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/people/ConvertX/61580651301833/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/convertxb2b" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.services}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.s1}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.s2}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.s3}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.s4}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.company}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.c1}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.c2}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.c3}</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">{t.footer.c4}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t.footer.c5}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">{t.footer.contact}</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:bao.ngo@convertx.biz" className="hover:text-white transition-colors">bao.ngo@convertx.biz</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+84908734657" className="hover:text-white transition-colors">+84 908734657</a>
                </li>
                <li>{t.footer.address}</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} ConvertX. {t.footer.rights}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget */}
      <LiveChat />

      {/* Cookie Consent Banner */}
      <CookieConsent lang={lang} />

      {/* Hidden Lead Magnet Content for PDF Generation */}
      <LeadMagnetContent lang={lang} />
    </div>
  );
}

