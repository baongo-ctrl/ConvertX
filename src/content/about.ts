import type { Language } from '../lib/useLanguage';

export type AboutContent = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  mission: string;
  identity: string;
  advantageTitle: string;
  advantages: { title: string; body: string }[];
  landscapeTitle: string;
  landscape: string[];
  industriesTitle: string;
  industries: string[];
  clientsTitle: string;
  clientsNote: string;
  clients: string[];
  locationTitle: string;
  location: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const about: Record<Language, AboutContent> = {
  en: {
    seoTitle: 'About ConvertX | B2B Growth Agency',
    seoDescription:
      'ConvertX is a Ho Chi Minh City B2B growth agency helping SaaS, eCommerce, EdTech, and professional services firms win trust and generate qualified leads.',
    eyebrow: 'About ConvertX',
    title: 'A strategic guide for B2B growth in Vietnam',
    mission:
      'ConvertX is a B2B growth and marketing agency. We help B2B SaaS, eCommerce, EdTech, and professional services businesses build their market position, generate qualified leads, and scale revenue.',
    identity: 'The work is modern, professional, and built to be reliable.',
    advantageTitle: 'The ConvertX advantage',
    advantages: [
      {
        title: 'Strategic guide, not just an executor',
        body: 'ConvertX works as a guide that understands how to build influence, establish trust, and navigate the B2B decision-making process in Vietnam.',
      },
      {
        title: 'Measurable results',
        body: 'We commit to practical, measurable growth and return on investment, rather than activity that only looks busy.',
      },
      {
        title: 'Hybrid go-to-market expertise',
        body: 'We adapt international and local B2B go-to-market strategies to Vietnam’s hybrid buying reality, so the online presence and the offline relationship tell the same story.',
      },
    ],
    landscapeTitle: 'Vietnam’s hybrid B2B buying journey',
    landscape: [
      'Over 50% of Vietnamese enterprise buyers now prefer a hybrid purchasing journey.',
      'Buyers validate a solution online before they talk to sales, then finalize the decision through relationships and trust.',
      'Global and local B2B companies need a digital presence that earns the first meeting, and an in-person experience that matches what the buyer already saw online.',
    ],
    industriesTitle: 'Industries we serve',
    industries: ['SaaS B2B', 'eCommerce B2B', 'Professional Services', 'EdTech', 'HealthTech'],
    clientsTitle: 'Notable clients',
    clientsNote: 'Teams we have worked with.',
    clients: ['ClassIn', 'cirCO', 'Wego Coffee', 'OKR Business', 'Sylva', 'Firegroup'],
    locationTitle: 'Where we work',
    location: 'District 3, Ho Chi Minh City, Vietnam',
    ctaTitle: 'Talk through a growth brief',
    ctaBody: 'Tell us where the pipeline stalls. We will come back with a scope that matches one of the published packages, or a combination of them.',
    ctaPrimary: 'Book a strategy call',
    ctaSecondary: 'View pricing',
  },
  vi: {
    seoTitle: 'Về ConvertX | Đối tác tăng trưởng B2B',
    seoDescription:
      'ConvertX là agency tăng trưởng B2B tại TP. Hồ Chí Minh, đồng hành cùng SaaS, eCommerce, EdTech và dịch vụ chuyên nghiệp để xây dựng niềm tin và tạo lead chất lượng.',
    eyebrow: 'Về ConvertX',
    title: 'Người dẫn đường cho tăng trưởng B2B tại Việt Nam',
    mission:
      'ConvertX là agency tăng trưởng và marketing B2B. Chúng tôi giúp doanh nghiệp B2B SaaS, eCommerce, EdTech và dịch vụ chuyên nghiệp xây dựng vị thế thị trường, tạo lead chất lượng và mở rộng doanh thu.',
    identity: 'Cách làm việc hiện đại, chuyên nghiệp và đáng tin cậy.',
    advantageTitle: 'Lợi thế của ConvertX',
    advantages: [
      {
        title: 'Người dẫn đường, không chỉ là người thực thi',
        body: 'ConvertX đóng vai trò người dẫn đường: hiểu cách xây dựng ảnh hưởng, thiết lập niềm tin và đi cùng quy trình ra quyết định B2B tại Việt Nam.',
      },
      {
        title: 'Kết quả đo được',
        body: 'Chúng tôi cam kết tăng trưởng thực tế, đo được và gắn với hiệu quả đầu tư, thay vì những chỉ số trông có vẻ sôi động.',
      },
      {
        title: 'Chuyên môn go-to-market lai',
        body: 'Chúng tôi điều chỉnh chiến lược go-to-market quốc tế và nội địa cho thực tế mua hàng lai tại Việt Nam, để hiện diện online và quan hệ offline kể cùng một câu chuyện.',
      },
    ],
    landscapeTitle: 'Hành trình mua hàng B2B lai tại Việt Nam',
    landscape: [
      'Hơn 50% người mua doanh nghiệp tại Việt Nam hiện ưu tiên hành trình mua hàng lai.',
      'Người mua kiểm chứng giải pháp online trước khi gặp sales, rồi chốt quyết định qua mối quan hệ và niềm tin.',
      'Doanh nghiệp B2B toàn cầu và nội địa cần một hiện diện số đủ tin cậy để có buổi gặp đầu tiên, và một trải nghiệm trực tiếp khớp với những gì người mua đã thấy online.',
    ],
    industriesTitle: 'Ngành chúng tôi phục vụ',
    industries: ['SaaS B2B', 'eCommerce B2B', 'Dịch vụ chuyên nghiệp', 'EdTech', 'HealthTech'],
    clientsTitle: 'Khách hàng tiêu biểu',
    clientsNote: 'Những đội ngũ chúng tôi đã đồng hành.',
    clients: ['ClassIn', 'cirCO', 'Wego Coffee', 'OKR Business', 'Sylva', 'Firegroup'],
    locationTitle: 'Nơi làm việc',
    location: 'Quận 3, TP. Hồ Chí Minh, Việt Nam',
    ctaTitle: 'Trao đổi một bài toán tăng trưởng',
    ctaBody: 'Hãy nói với chúng tôi chỗ phễu đang tắc. Chúng tôi phản hồi bằng một phạm vi khớp với gói dịch vụ đã công bố, hoặc một gói kết hợp.',
    ctaPrimary: 'Đặt lịch tư vấn',
    ctaSecondary: 'Xem bảng giá',
  },
};

export function getAbout(lang: Language): AboutContent {
  return about[lang];
}
