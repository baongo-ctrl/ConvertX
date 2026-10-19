import type { Language } from '../lib/useLanguage';

/**
 * Dong per one US dollar. English prices are this rate applied to the VND
 * amounts below, then rounded to the nearest $100.
 *
 * 26,000 is the 19 Oct 2026 figure used here: the nearest round thousand to
 * that day's mid-market rate (about 25,900 VND per USD). The State Bank
 * interbank reference quoted by NCB the same day was 25,633.
 */
export const VND_PER_USD = 26_000;

/** Nearest $100, so a rate change still produces marketing-friendly prices. */
export function toMarketingUsd(millionVnd: number): number {
  const usd = (millionVnd * 1_000_000) / VND_PER_USD;
  return Math.round(usd / 100) * 100;
}

type PriceUnit = 'project' | 'month' | 'event' | 'plain' | 'monthTight';

type VndBand = {
  min: number;
  max?: number;
  approx?: boolean;
  unit: PriceUnit;
  label?: { en: string; vi: string };
};

const PRICE_UNITS: Record<PriceUnit, { en: string; vi: string }> = {
  project: { en: ' / project', vi: ' triệu VND / dự án' },
  month: { en: ' / month', vi: ' triệu VND / tháng' },
  event: { en: '/event', vi: ' triệu VND/sự kiện' },
  plain: { en: '', vi: ' triệu VND' },
  monthTight: { en: '/month', vi: ' triệu VND/tháng' },
};

/** VND millions. English display is derived; do not hard-code USD. */
const PACKAGE_PRICES: Record<string, { price: VndBand; alt?: VndBand }> = {
  launch: { price: { min: 55, max: 75, approx: true, unit: 'project' } },
  growth: { price: { min: 90, max: 180, unit: 'month' } },
  thought: { price: { min: 40, max: 60, unit: 'month' } },
  event: {
    price: { min: 25, max: 35, unit: 'event', label: { en: 'Webinar:', vi: 'Webinar:' } },
    alt: {
      min: 60,
      max: 120,
      unit: 'event',
      label: { en: 'Offline (50–100 guests):', vi: 'Offline (50–100 khách):' },
    },
  },
  crm: { price: { min: 30, max: 50, unit: 'project' } },
  intelligence: { price: { min: 70, max: 100, unit: 'project' } },
};

const COMBO_PRICES: Record<string, VndBand> = {
  'Startup Launch Combo': { min: 90, max: 110, unit: 'plain' },
  'Growth Loop Combo': { min: 120, max: 200, unit: 'monthTight' },
  'Brand Repositioning Combo': { min: 100, unit: 'plain' },
};

function formatBand(lang: Language, band: VndBand): string {
  const tilde = band.approx ? '~' : '';
  const figures = lang === 'vi'
    ? (band.max ? `${tilde}${band.min}–${band.max}` : `${tilde}${band.min}`)
    : (band.max
      ? `${tilde}$${toMarketingUsd(band.min).toLocaleString('en-US')}–$${toMarketingUsd(band.max).toLocaleString('en-US')}`
      : `${tilde}$${toMarketingUsd(band.min).toLocaleString('en-US')}`);
  const prefix = band.label ? `${band.label[lang]} ` : '';
  return `${prefix}${figures}${PRICE_UNITS[band.unit][lang]}`;
}

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

type PackageCopy = Omit<PricingPackage, 'price' | 'priceAlt'>;
type ComboCopy = Omit<ComboPackage, 'price'>;

const packages: Record<Language, PackageCopy[]> = {
  en: [
    {
      id: 'launch',
      title: 'B2B Launch Kit (Brand Kickstart)',
      purpose: 'Foundational positioning and marketing system for startups entering the B2B market.',
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

const combos: Record<Language, ComboCopy[]> = {
  en: [
    {
      title: 'Startup Launch Combo',
      includes: 'Launch Kit + Thought Leadership',
      fit: 'Best for newly launched SaaS B2B companies.',
    },
    {
      title: 'Growth Loop Combo',
      includes: 'Growth Engine + CRM Optimization',
      fit: 'Best for scaling lead and sales systems.',
    },
    {
      title: 'Brand Repositioning Combo',
      includes: 'Market Intelligence + Launch Kit',
      fit: 'Best for rebranding or international expansion.',
    },
  ],
  vi: [
    {
      title: 'Startup Launch Combo',
      includes: 'Launch Kit + Thought Leadership',
      fit: 'Phù hợp nhất với công ty SaaS B2B mới ra mắt.',
    },
    {
      title: 'Growth Loop Combo',
      includes: 'Growth Engine + CRM Optimization',
      fit: 'Phù hợp nhất khi cần mở rộng hệ thống lead và bán hàng.',
    },
    {
      title: 'Brand Repositioning Combo',
      includes: 'Market Intelligence + Launch Kit',
      fit: 'Phù hợp nhất khi tái định vị thương hiệu hoặc mở rộng ra thị trường quốc tế.',
    },
  ],
};

export function getPricing(lang: Language): { packages: PricingPackage[]; combos: ComboPackage[] } {
  return {
    packages: packages[lang].map((pkg) => {
      const spec = PACKAGE_PRICES[pkg.id];
      return {
        ...pkg,
        price: formatBand(lang, spec.price),
        priceAlt: spec.alt ? formatBand(lang, spec.alt) : undefined,
      };
    }),
    combos: combos[lang].map((combo) => ({
      ...combo,
      price: formatBand(lang, COMBO_PRICES[combo.title]),
    })),
  };
}
