import React from 'react';

type Language = 'en' | 'vi';

interface Props {
  lang: Language;
}

export default function LeadMagnetContent({ lang }: Props) {
  const content = {
    en: {
      title: '10-Point B2B Growth Checklist',
      subtitle: 'Your blueprint for predictable revenue.',
      items: [
        { title: '1. Define ICP', desc: 'Clearly document your Ideal Customer Profile and buyer personas.' },
        { title: '2. Value Proposition', desc: 'Craft a compelling, problem-centric value proposition.' },
        { title: '3. CRM Setup', desc: 'Implement and customize a CRM (HubSpot/Salesforce) for your sales process.' },
        { title: '4. Lead Magnet', desc: 'Create a high-value downloadable asset to capture emails.' },
        { title: '5. Outbound Engine', desc: 'Set up cold email and LinkedIn outreach sequences.' },
        { title: '6. Inbound Content', desc: 'Publish weekly SEO-optimized content addressing customer pain points.' },
        { title: '7. Retargeting', desc: 'Launch retargeting ads to stay top-of-mind for website visitors.' },
        { title: '8. Sales Enablement', desc: 'Create case studies, one-pagers, and pitch decks for the sales team.' },
        { title: '9. Analytics', desc: 'Track core metrics (CAC, LTV, Win Rate, Sales Cycle Length).' },
        { title: '10. RevOps Alignment', desc: 'Ensure marketing and sales teams meet weekly to align on lead quality.' }
      ],
      footer: 'Ready to scale? Visit convertx.biz'
    },
    vi: {
      title: 'Danh sách kiểm tra 10 điểm Tăng trưởng B2B',
      subtitle: 'Bản thiết kế cho nguồn doanh thu có thể dự đoán được.',
      items: [
        { title: '1. Xác định ICP', desc: 'Ghi chép rõ ràng Chân dung Khách hàng Mục tiêu và người mua.' },
        { title: '2. Tuyên bố Giá trị', desc: 'Xây dựng một tuyên bố giá trị hấp dẫn, tập trung vào vấn đề.' },
        { title: '3. Thiết lập CRM', desc: 'Triển khai và tùy chỉnh CRM cho quy trình bán hàng của bạn.' },
        { title: '4. Lead Magnet', desc: 'Tạo tài liệu giá trị cao để thu thập email khách hàng tiềm năng.' },
        { title: '5. Cỗ máy Outbound', desc: 'Thiết lập các chuỗi email lạnh và tiếp cận qua LinkedIn.' },
        { title: '6. Nội dung Inbound', desc: 'Xuất bản nội dung chuẩn SEO hàng tuần giải quyết nỗi đau của khách.' },
        { title: '7. Quảng cáo Bám đuổi', desc: 'Chạy quảng cáo bám đuổi để luôn hiện diện trong tâm trí khách truy cập.' },
        { title: '8. Tài liệu Bán hàng', desc: 'Tạo case study, tài liệu giới thiệu và slide cho đội ngũ sales.' },
        { title: '9. Phân tích Dữ liệu', desc: 'Theo dõi các chỉ số cốt lõi (CAC, LTV, Tỷ lệ thắng, Chu kỳ bán hàng).' },
        { title: '10. Đồng bộ RevOps', desc: 'Đảm bảo marketing và sales họp hàng tuần để thống nhất chất lượng lead.' }
      ],
      footer: 'Sẵn sàng mở rộng? Truy cập convertx.biz'
    }
  };

  const t = content[lang];

  return (
    <div 
      id="pdf-content" 
      className="w-[794px] bg-[#ffffff] p-12 text-[#0f172a] absolute left-[-9999px] top-0"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="border-b-2 border-[#10b981] pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0f172a] mb-2">{t.title}</h1>
          <p className="text-xl text-[#475569]">{t.subtitle}</p>
        </div>
        <div className="text-2xl font-bold text-[#059669] flex items-center gap-2">
          <div className="w-10 h-10 bg-[#059669] rounded-lg flex items-center justify-center">
            <span className="text-[#ffffff] text-xl">X</span>
          </div>
          ConvertX
        </div>
      </div>

      <div className="space-y-6">
        {t.items.map((item, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#d1fae5] text-[#059669] flex items-center justify-center font-bold shrink-0 mt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f172a]">{item.title}</h3>
              <p className="text-[#475569]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-[#e2e8f0] text-center text-[#64748b] font-medium">
        {t.footer}
      </div>
    </div>
  );
}
