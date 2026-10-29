/**
 * First-touch attribution for the current browser session.
 * Maps to HubSpot convertx_lead_source_detail (enumeration).
 */

const ATTR_KEY = 'cx-attr-v1';
const PACKAGE_KEY = 'cx-package-interest';
const OFFER_HINT_KEY = 'cx-offer-hint';

export type LeadSourceDetail =
  | 'organic_blog'
  | 'linkedin'
  | 'google_ads'
  | 'referral'
  | 'zalo_oa'
  | 'outbound'
  | 'partner'
  | 'other';

export type PackageInterest =
  | 'launch_kit'
  | 'growth_engine'
  | 'thought_leadership'
  | 'event_accelerator'
  | 'crm_automation'
  | 'market_intelligence'
  | 'undecided';

export type ConvertxOffer =
  | 'funnel_audit'
  | 'saas_growth_checklist'
  | 'outsourcing_inbound_playbook'
  | 'thought_leadership_brief'
  | 'event_webinar'
  | 'other';

export type AttributionSnapshot = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  gclid: string;
  fbclid: string;
  li_fat_id: string;
  referrer: string;
  landing: string;
};

const PACKAGE_BY_ID: Record<string, PackageInterest> = {
  launch: 'launch_kit',
  growth: 'growth_engine',
  thought: 'thought_leadership',
  event: 'event_accelerator',
  crm: 'crm_automation',
  intelligence: 'market_intelligence',
  launch_kit: 'launch_kit',
  growth_engine: 'growth_engine',
  thought_leadership: 'thought_leadership',
  event_accelerator: 'event_accelerator',
  crm_automation: 'crm_automation',
  market_intelligence: 'market_intelligence',
  undecided: 'undecided',
};

/** Map marketing labels / data-interest strings to package enum. */
const PACKAGE_BY_LABEL: Record<string, PackageInterest> = {
  'b2b launch kit': 'launch_kit',
  'b2b launch kit (brand kickstart)': 'launch_kit',
  'growth engine': 'growth_engine',
  'growth engine (b2b customer growth)': 'growth_engine',
  'thought leadership program': 'thought_leadership',
  'thought leadership program (ceo/founder branding)': 'thought_leadership',
  'b2b event & partnership accelerator': 'event_accelerator',
  'crm + automation optimization': 'crm_automation',
  'market intelligence & brand strategy': 'market_intelligence',
  // Combos: closest primary package
  'growth loop': 'growth_engine',
  'startup launch combo': 'launch_kit',
  'growth loop combo': 'growth_engine',
  'brand repositioning combo': 'market_intelligence',
  'free funnel audit': 'undecided',
};

export const RESOURCE_OFFER_BY_TITLE: Record<string, ConvertxOffer> = {
  'Báo cáo xu hướng ứng dụng AI vào GTM cho B2B SaaS': 'thought_leadership_brief',
  'Báo cáo Toàn cảnh: Kỷ nguyên AI trong Sales & Marketing': 'thought_leadership_brief',
  'Content B2B AI Prompt Playbook': 'outsourcing_inbound_playbook',
  'Biểu đồ tăng trưởng B2B': 'saas_growth_checklist',
  'Những sai lầm trong triển khai marketing B2B': 'funnel_audit',
};

const ROLE_TO_JOBTITLE: Record<string, string> = {
  ceo: 'CEO/Founder',
  marketing: 'Marketing Director/Manager',
  sales: 'Sales Director/Manager',
  other: 'Other',
};

function safeGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Private mode
  }
}

function param(params: URLSearchParams, name: string): string {
  return (params.get(name) || '').trim().slice(0, 200);
}

export function captureAttribution(): AttributionSnapshot {
  const existing = safeGet(ATTR_KEY);
  if (existing) {
    try {
      return JSON.parse(existing) as AttributionSnapshot;
    } catch {
      // fall through and recapture
    }
  }

  const params = new URLSearchParams(window.location.search);
  const snap: AttributionSnapshot = {
    utm_source: param(params, 'utm_source'),
    utm_medium: param(params, 'utm_medium'),
    utm_campaign: param(params, 'utm_campaign'),
    gclid: param(params, 'gclid'),
    fbclid: param(params, 'fbclid'),
    li_fat_id: param(params, 'li_fat_id'),
    referrer: (document.referrer || '').slice(0, 500),
    landing: `${window.location.pathname}${window.location.search}`.slice(0, 500),
  };
  safeSet(ATTR_KEY, JSON.stringify(snap));

  const pkgParam = param(params, 'package');
  if (pkgParam) setPackageInterest(pkgParam);

  return snap;
}

export function getAttribution(): AttributionSnapshot {
  return captureAttribution();
}

export function mapLeadSource(attr: AttributionSnapshot = getAttribution()): LeadSourceDetail {
  const src = attr.utm_source.toLowerCase();
  const med = attr.utm_medium.toLowerCase();
  const ref = attr.referrer.toLowerCase();
  const landing = attr.landing.toLowerCase();

  if (attr.gclid || (src.includes('google') && /^(cpc|ppc|paid|paidsearch)$/.test(med))) {
    return 'google_ads';
  }
  if (attr.li_fat_id || src.includes('linkedin') || ref.includes('linkedin.com')) {
    return 'linkedin';
  }
  if (src.includes('zalo') || med.includes('zalo') || ref.includes('zalo')) {
    return 'zalo_oa';
  }
  if (med === 'partner' || src === 'partner') return 'partner';
  if (med === 'referral') return 'referral';
  if (med === 'email' || med === 'outbound' || src === 'outbound') return 'outbound';

  const searchHosts = ['google.', 'bing.', 'coccoc.', 'yahoo.', 'duckduckgo.'];
  if (searchHosts.some((h) => ref.includes(h)) || landing.includes('/blog')) {
    return 'organic_blog';
  }
  if (ref && !ref.includes(window.location.hostname)) return 'referral';
  return 'other';
}

export function attributionRawLine(attr: AttributionSnapshot = getAttribution()): string {
  const parts = [
    `utm_source=${attr.utm_source || '-'}`,
    `utm_medium=${attr.utm_medium || '-'}`,
    `utm_campaign=${attr.utm_campaign || '-'}`,
    `gclid=${attr.gclid || '-'}`,
    `ref=${attr.referrer || '-'}`,
    `landing=${attr.landing || '-'}`,
  ];
  return `[src] ${parts.join('|')}`;
}

export function resolvePackageInterest(raw: string | null | undefined): PackageInterest {
  if (!raw) return 'undecided';
  const key = raw.trim().toLowerCase();
  if (PACKAGE_BY_ID[key]) return PACKAGE_BY_ID[key];
  if (PACKAGE_BY_LABEL[key]) return PACKAGE_BY_LABEL[key];
  // loose contains
  if (key.includes('launch')) return 'launch_kit';
  if (key.includes('growth engine') || key === 'growth' || key.includes('growth loop')) {
    return 'growth_engine';
  }
  if (key.includes('thought')) return 'thought_leadership';
  if (key.includes('event')) return 'event_accelerator';
  if (key.includes('crm') || key.includes('automation')) return 'crm_automation';
  if (key.includes('intelligence') || key.includes('market')) return 'market_intelligence';
  return 'undecided';
}

export function setPackageInterest(raw: string) {
  const resolved = resolvePackageInterest(raw);
  safeSet(PACKAGE_KEY, resolved);
  const lower = raw.trim().toLowerCase();
  if (lower.includes('funnel audit')) {
    safeSet(OFFER_HINT_KEY, 'funnel_audit');
  }
}

export function getPackageInterest(): PackageInterest {
  const stored = safeGet(PACKAGE_KEY);
  return resolvePackageInterest(stored || 'undecided');
}

export function getOfferHint(): ConvertxOffer | null {
  const v = safeGet(OFFER_HINT_KEY);
  if (
    v === 'funnel_audit' ||
    v === 'saas_growth_checklist' ||
    v === 'outsourcing_inbound_playbook' ||
    v === 'thought_leadership_brief' ||
    v === 'event_webinar' ||
    v === 'other'
  ) {
    return v;
  }
  return null;
}

export function bindPackageCtas(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-cx-package], [data-interest]').forEach((el) => {
    el.addEventListener('click', () => {
      const raw =
        el.getAttribute('data-cx-package') ||
        el.getAttribute('data-interest') ||
        '';
      if (raw) setPackageInterest(raw);
    });
  });
}

export function detectHsLanguage(pathname = window.location.pathname): 'en' | 'vi' {
  if (
    pathname === '/en' ||
    pathname.startsWith('/en/') ||
    pathname.startsWith('/convertx-vs-agency/en')
  ) {
    return 'en';
  }
  return 'vi';
}

export function splitPersonName(
  fullName: string,
  language: 'en' | 'vi',
): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstname: '', lastname: '' };
  if (parts.length === 1) return { firstname: parts[0], lastname: '' };
  if (language === 'vi') {
    // Vietnamese: family name first
    return { lastname: parts[0], firstname: parts.slice(1).join(' ') };
  }
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') };
}

/** Webinar form: firstName = "Họ và tên đệm", lastName = "Tên" (given). */
export function webinarNameToHubspot(formFirstName: string, formLastName: string) {
  return {
    firstname: formLastName.trim(),
    lastname: formFirstName.trim(),
  };
}

export function roleToJobtitle(role: string): string {
  return ROLE_TO_JOBTITLE[role] || 'Other';
}

export function offerForResource(title: string): ConvertxOffer {
  return RESOURCE_OFFER_BY_TITLE[title] || 'other';
}

export function initAttribution() {
  if (typeof window === 'undefined') return;
  captureAttribution();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => bindPackageCtas());
  } else {
    bindPackageCtas();
  }
}
