import type { Language } from '../lib/useLanguage';

type Props = {
  lang: Language;
  idPrefix: string;
  /** Show segment + Zalo (contact / webinar). Resource/chat omit this component. */
  showSegment?: boolean;
  showZalo?: boolean;
};

const copy = {
  en: {
    segmentLabel: 'Your business type',
    segmentPlaceholder: 'Select (optional)',
    saas: 'B2B SaaS',
    services: 'B2B Professional Services (outsourcing, consulting…)',
    zalo: 'I agree to receive consultations and useful content from ConvertX via Zalo OA. You can opt out anytime.',
  },
  vi: {
    segmentLabel: 'Lĩnh vực của bạn',
    segmentPlaceholder: 'Chọn (không bắt buộc)',
    saas: 'B2B SaaS',
    services: 'Dịch vụ chuyên nghiệp B2B (outsourcing, tư vấn…)',
    zalo: 'Tôi đồng ý nhận tư vấn và nội dung hữu ích từ ConvertX qua Zalo OA. Có thể hủy bất cứ lúc nào.',
  },
} as const;

export default function HubSpotExtraFields({
  lang,
  idPrefix,
  showSegment = true,
  showZalo = true,
}: Props) {
  const t = copy[lang];
  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-white';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-2';

  return (
    <>
      {showSegment && (
        <div>
          <label htmlFor={`${idPrefix}-segment`} className={labelClass}>
            {t.segmentLabel}
          </label>
          <select
            id={`${idPrefix}-segment`}
            name="convertx_segment"
            className={inputClass}
            defaultValue=""
          >
            <option value="">{t.segmentPlaceholder}</option>
            <option value="b2b_saas">{t.saas}</option>
            <option value="b2b_professional_services">{t.services}</option>
          </select>
        </div>
      )}
      {showZalo && (
        <label
          htmlFor={`${idPrefix}-zalo`}
          className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer"
        >
          <input
            type="checkbox"
            id={`${idPrefix}-zalo`}
            name="zalo_oa_opt_in"
            value="true"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>{t.zalo}</span>
        </label>
      )}
    </>
  );
}
