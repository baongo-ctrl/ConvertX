import type { Language } from '../lib/useLanguage';

export type PricingPackage = {
  id: string;
  title: string;
  purpose: string;
  price: string;
  priceAlt?: string;
  note?: string;
  includes: string[];
  featured?: boolean;
};

export type ComboPackage = {
  title: string;
  includes: string;
  price: string;
  fit: string;
};

const packages: Record<Language, PricingPackage[]> = {
  en: [
    {
      id: 'launch',
      title: 'B2B Launch Kit (Brand Kickstart)',
      purpose: 'Foundational positioning and marketing system for startups entering the B2B market.',
      price: '~55–75 million VND / project',
      note: 'Duration: 2–3 weeks',
      includes: [
        'Brand Research & Positioning (ICP, USP)',
        'Visual Identity Design',
        '1-page Website Landing Page',
        '3-Month Content Strategy',
        'Basic CRM Setup',
      ],
    },
    {
      id: 'growth',
      title: 'Growth Engine (B2B Customer Growth)',
      purpose: 'Long-term lead generation engine for businesses lacking consistent lead flow.',
      price: '90–180 million VND / month',
      note: 'Varies by ad budget',
      includes: [
        'Inbound Marketing (SEO, blogs, case studies)',
        'Account-Based Marketing (ABM for 100 ICPs)',
        'Email Automation',
        'Paid Ads (LinkedIn + Google)',
        'Data Studio Dashboard',
      ],
      featured: true,
    },
    {
      id: 'thought',
      title: 'Thought Leadership Program (CEO/Founder Branding)',
      purpose: 'Transform executives into industry thought leaders. Highly effective for SaaS B2B and other expertise-led B2B brands.',
      price: '40–60 million VND / month',
      includes: [
        'Personal Branding Audit',
        'Ghostwriting (8 LinkedIn posts/month, 1 blog, 1 video)',
        'PR & Podcast Booking',
        'Visual Identity updates',
      ],
    },
    {
      id: 'event',
      title: 'B2B Event & Partnership Accelerator',
      purpose: 'Generate high-quality leads (SQLs) via webinars and physical events.',
      price: 'Webinar: 25–35 million VND/event',
      priceAlt: 'Offline (50–100 guests): 60–120 million VND/event',
      includes: [
        'Event Concept & Planning',
        'Promotion Campaign',
        'Onsite/Online Operation',
        'Follow-up Automation',
      ],
    },
    {
      id: 'crm',
      title: 'CRM + Automation Optimization',
      purpose: 'Standardize management, reduce response time, and improve closing rates.',
      price: '30–50 million VND / project',
      includes: [
        'CRM Audit',
        'Automation Setup (workflows, lead scoring)',
        'KPI Dashboard',
        'Team Training (HubSpot, Zoho, ClickUp)',
      ],
    },
    {
      id: 'intelligence',
      title: 'Market Intelligence & Brand Strategy',
      purpose: 'Deep market insights and rebranding for stronger market positioning.',
      price: '70–100 million VND / project',
      note: 'Duration: 4–6 weeks',
      includes: [
        'Industry Report',
        'Competitor Mapping',
        'Brand Audit',
        'Brand Strategy Deck',
      ],
    },
  ],
  vi: [
    {
      id: 'launch',
      title: 'B2B Launch Kit (Khởi động thương hiệu)',
      purpose: 'Hệ thống định vị và marketing nền tảng cho startup bước vào thị trường B2B.',
      price: '~55–75 triệu VND / dự án',
      note: 'Thời gian: 2–3 tuần',
      includes: [
        'Nghiên cứu và định vị thương hiệu (ICP, USP)',
        'Thiết kế nhận diện hình ảnh',
        'Landing page 1 trang',
        'Chiến lược nội dung 3 tháng',
        'Thiết lập CRM cơ bản',
      ],
    },
    {
      id: 'growth',
      title: 'Growth Engine (Tăng trưởng khách hàng B2B)',
      purpose: 'Cỗ máy tạo lead dài hạn cho doanh nghiệp chưa có dòng lead ổn định.',
      price: '90–180 triệu VND / tháng',
      note: 'Tùy ngân sách quảng cáo',
      includes: [
        'Inbound Marketing (SEO, blog, case study)',
        'Account-Based Marketing (ABM cho 100 ICP)',
        'Tự động hóa email',
        'Quảng cáo trả phí (LinkedIn + Google)',
        'Dashboard Data Studio',
      ],
      featured: true,
    },
    {
      id: 'thought',
      title: 'Thought Leadership Program (Thương hiệu CEO/Founder)',
      purpose: 'Đưa lãnh đạo thành người dẫn dắt tư tưởng trong ngành. Phù hợp với SaaS B2B và các thương hiệu B2B dựa trên chuyên môn.',
      price: '40–60 triệu VND / tháng',
      includes: [
        'Đánh giá thương hiệu cá nhân',
        'Viết hộ (8 bài LinkedIn/tháng, 1 blog, 1 video)',
        'Đặt lịch PR và podcast',
        'Cập nhật nhận diện hình ảnh',
      ],
    },
    {
      id: 'event',
      title: 'B2B Event & Partnership Accelerator',
      purpose: 'Tạo lead chất lượng cao (SQL) qua webinar và sự kiện trực tiếp.',
      price: 'Webinar: 25–35 triệu VND/sự kiện',
      priceAlt: 'Offline (50–100 khách): 60–120 triệu VND/sự kiện',
      includes: [
        'Ý tưởng và lập kế hoạch sự kiện',
        'Chiến dịch quảng bá',
        'Vận hành onsite/online',
        'Tự động hóa follow-up',
      ],
    },
    {
      id: 'crm',
      title: 'CRM + Automation Optimization',
      purpose: 'Chuẩn hóa quản lý, giảm thời gian phản hồi và cải thiện tỷ lệ chốt.',
      price: '30–50 triệu VND / dự án',
      includes: [
        'Kiểm toán CRM',
        'Thiết lập tự động hóa (workflow, lead scoring)',
        'Dashboard KPI',
        'Đào tạo đội ngũ (HubSpot, Zoho, ClickUp)',
      ],
    },
    {
      id: 'intelligence',
      title: 'Market Intelligence & Brand Strategy',
      purpose: 'Thông tin thị trường chuyên sâu và tái định vị để đứng vững hơn trên thị trường.',
      price: '70–100 triệu VND / dự án',
      note: 'Thời gian: 4–6 tuần',
      includes: [
        'Báo cáo ngành',
        'Bản đồ đối thủ',
        'Kiểm toán thương hiệu',
        'Bộ chiến lược thương hiệu',
      ],
    },
  ],
};

const combos: Record<Language, ComboPackage[]> = {
  en: [
    {
      title: 'Startup Launch Combo',
      includes: 'Launch Kit + Thought Leadership',
      price: '90–110 million VND',
      fit: 'Best for newly launched SaaS B2B companies.',
    },
    {
      title: 'Growth Loop Combo',
      includes: 'Growth Engine + CRM Optimization',
      price: '120–200 million VND/month',
      fit: 'Best for scaling lead and sales systems.',
    },
    {
      title: 'Brand Repositioning Combo',
      includes: 'Market Intelligence + Launch Kit',
      price: '100 million VND',
      fit: 'Best for rebranding or international expansion.',
    },
  ],
  vi: [
    {
      title: 'Startup Launch Combo',
      includes: 'Launch Kit + Thought Leadership',
      price: '90–110 triệu VND',
      fit: 'Phù hợp nhất với công ty SaaS B2B mới ra mắt.',
    },
    {
      title: 'Growth Loop Combo',
      includes: 'Growth Engine + CRM Optimization',
      price: '120–200 triệu VND/tháng',
      fit: 'Phù hợp nhất khi cần mở rộng hệ thống lead và bán hàng.',
    },
    {
      title: 'Brand Repositioning Combo',
      includes: 'Market Intelligence + Launch Kit',
      price: '100 triệu VND',
      fit: 'Phù hợp nhất khi tái định vị thương hiệu hoặc mở rộng ra thị trường quốc tế.',
    },
  ],
};

export function getPricing(lang: Language): { packages: PricingPackage[]; combos: ComboPackage[] } {
  return { packages: packages[lang], combos: combos[lang] };
}
