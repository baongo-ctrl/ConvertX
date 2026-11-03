/**
 * First-touch attribution (localStorage) shared by SPA + static pages (cx-hubspot.js).
 * Maps to HubSpot convertx_lead_source_detail (enumeration).
 *
 * UTM convention (lowercase, hyphens) — edit SOURCE_MAP / OUTBOUND_MEDIUMS below:
 *   utm_source: gmail|whatsapp|zalo|linkedin|reddit|luma|upwork|freelancer|designrush|…
 *   utm_medium: outreach|chat|social-dm|social-post|platform-msg|email|outbound|partner|referral|…
 *   utm_campaign: goal-yyyy-mm (e.g. growth-engine-2026-11)
 *   utm_content: owner+step (e.g. b2b-outreach-step1, nurture-d3)
 *   utm_term: ICP 1a|1b|2a|2b
 *
 * Partner detection: utm_medium === 'partner' OR utm_source === 'partner'
 *   (exact match after lowercasing). Referral: utm_medium === 'referral'.
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
  utm_content: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
  li_fat_id: string;
  referrer: string;
  landing: string;
  /** Epoch ms when this first-touch snapshot was stored. */
  ts?: number;
};

/**
 * Easy-to-edit mapping inputs for convertx_lead_source_detail.
 * Order of evaluation is in mapLeadSource() — keep paid/linkedin/zalo before outbound.
 */
export const OUTBOUND_MEDIUMS = ['outreach', 'email', 'outbound'] as const;

/** Sources that always map to `other` (platform / directory / community). */
export const OTHER_SOURCES = [
  'reddit',
  'luma',
  'upwork',
  'freelancer',
  'designrush',
] as const;

/** Mediums that always map to `other`. */
export const OTHER_MEDIUMS = ['platform-msg', 'social-post'] as const;

/** WhatsApp chat content prefixes that count as outbound (sales / B2B outreach). */
export const WHATSAPP_OUTBOUND_CONTENT_PREFIXES = ['b2b-outreach', 'sales-'] as const;

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

function safeGetLocal(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetLocal(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode
  }
}

/** Package interest still uses sessionStorage (per-tab intent). */
function safeGetSession(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetSession(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Private mode
  }
}

function param(params: URLSearchParams, name: string): string {
  return (params.get(name) || '').trim().slice(0, 200);
}

export function hasMarketingSignal(attr: AttributionSnapshot): boolean {
  return Boolean(
    attr.utm_source ||
      attr.utm_medium ||
      attr.utm_campaign ||
      attr.utm_content ||
      attr.utm_term ||
      attr.gclid ||
      attr.fbclid ||
      attr.li_fat_id,
  );
}

function normalizeSnapshot(raw: Partial<AttributionSnapshot> | null | undefined): AttributionSnapshot | null {
  if (!raw || typeof raw !== 'object') return null;
  return {
    utm_source: String(raw.utm_source || ''),
    utm_medium: String(raw.utm_medium || ''),
    utm_campaign: String(raw.utm_campaign || ''),
    utm_content: String(raw.utm_content || ''),
    utm_term: String(raw.utm_term || ''),
    gclid: String(raw.gclid || ''),
    fbclid: String(raw.fbclid || ''),
    li_fat_id: String(raw.li_fat_id || ''),
    referrer: String(raw.referrer || ''),
    landing: String(raw.landing || ''),
    ts: typeof raw.ts === 'number' ? raw.ts : undefined,
  };
}

function readStoredAttribution(): AttributionSnapshot | null {
  const existing = safeGetLocal(ATTR_KEY);
  if (!existing) return null;
  try {
    return normalizeSnapshot(JSON.parse(existing) as Partial<AttributionSnapshot>);
  } catch {
    return null;
  }
}

function buildSnapshotFromLocation(): AttributionSnapshot {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: param(params, 'utm_source'),
    utm_medium: param(params, 'utm_medium'),
    utm_campaign: param(params, 'utm_campaign'),
    utm_content: param(params, 'utm_content'),
    utm_term: param(params, 'utm_term'),
    gclid: param(params, 'gclid'),
    fbclid: param(params, 'fbclid'),
    li_fat_id: param(params, 'li_fat_id'),
    referrer: (document.referrer || '').slice(0, 500),
    landing: `${window.location.pathname}${window.location.search}`.slice(0, 500),
    ts: Date.now(),
  };
}

/**
 * Persist first marketing touch in localStorage (key cx-attr-v1).
 * Never overwrite a stored snap that already has UTM/click-ids with an empty/direct visit.
 * Upgrade an empty first pageview when a later visit carries marketing signals.
 */
export function captureAttribution(): AttributionSnapshot {
  const stored = readStoredAttribution();
  const current = buildSnapshotFromLocation();

  if (stored && hasMarketingSignal(stored)) {
    return stored;
  }
  if (hasMarketingSignal(current)) {
    safeSetLocal(ATTR_KEY, JSON.stringify(current));
    const pkgParam = param(new URLSearchParams(window.location.search), 'package');
    if (pkgParam) setPackageInterest(pkgParam);
    return current;
  }
  if (stored) {
    return stored;
  }
  safeSetLocal(ATTR_KEY, JSON.stringify(current));
  const pkgParam = param(new URLSearchParams(window.location.search), 'package');
  if (pkgParam) setPackageInterest(pkgParam);
  return current;
}

export function getAttribution(): AttributionSnapshot {
  return captureAttribution();
}

/**
 * Map first-touch attribution → convertx_lead_source_detail.
 * Pure: pass `attr` explicitly in unit tests (no window needed when attr is provided
 * except for the organic hostname check, which falls back safely).
 */
export function mapLeadSource(attr: AttributionSnapshot = getAttribution()): LeadSourceDetail {
  const src = (attr.utm_source || '').toLowerCase();
  const med = (attr.utm_medium || '').toLowerCase();
  const content = (attr.utm_content || '').toLowerCase();
  const ref = (attr.referrer || '').toLowerCase();
  const landing = (attr.landing || '').toLowerCase();

  // 1. Paid Google
  if (attr.gclid || (src.includes('google') && /^(cpc|ppc|paid|paidsearch)$/.test(med))) {
    return 'google_ads';
  }

  // 2. LinkedIn (src, Insight click id, or referrer)
  if (attr.li_fat_id || src.includes('linkedin') || ref.includes('linkedin.com')) {
    return 'linkedin';
  }

  // 3. Zalo OA
  if (src.includes('zalo') || med.includes('zalo') || ref.includes('zalo')) {
    return 'zalo_oa';
  }

  // 4. Partner / referral medium (documented: exact src/med === 'partner' | med === 'referral')
  if (med === 'partner' || src === 'partner') return 'partner';
  if (med === 'referral') return 'referral';

  // 5. Outbound / outreach email (must beat mail.google.com referrer → referral fallback)
  if (
    (OUTBOUND_MEDIUMS as readonly string[]).includes(med) ||
    src === 'gmail' ||
    src === 'outbound'
  ) {
    return 'outbound';
  }

  // 6. WhatsApp chat: outbound only for sales/outreach content prefixes
  if (src === 'whatsapp' && med === 'chat') {
    const isOutboundContent = (WHATSAPP_OUTBOUND_CONTENT_PREFIXES as readonly string[]).some(
      (p) => content.startsWith(p),
    );
    return isOutboundContent ? 'outbound' : 'other';
  }

  // 7. Platform / directory / social-post → other
  if (
    (OTHER_SOURCES as readonly string[]).includes(src) ||
    (OTHER_MEDIUMS as readonly string[]).includes(med)
  ) {
    return 'other';
  }

  // 8. Organic search / blog
  const searchHosts = ['google.', 'bing.', 'coccoc.', 'yahoo.', 'duckduckgo.'];
  if (searchHosts.some((h) => ref.includes(h)) || landing.includes('/blog')) {
    return 'organic_blog';
  }

  // 9. External referrer
  let hostname = '';
  try {
    hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  } catch {
    hostname = '';
  }
  if (ref && hostname && !ref.includes(hostname)) return 'referral';
  if (ref && !hostname) return 'referral';

  return 'other';
}

export function attributionRawLine(attr: AttributionSnapshot = getAttribution()): string {
  const parts = [
    `utm_source=${attr.utm_source || '-'}`,
    `utm_medium=${attr.utm_medium || '-'}`,
    `utm_campaign=${attr.utm_campaign || '-'}`,
    `utm_content=${attr.utm_content || '-'}`,
    `utm_term=${attr.utm_term || '-'}`,
    `gclid=${attr.gclid || '-'}`,
    `ref=${attr.referrer || '-'}`,
    `landing=${attr.landing || '-'}`,
  ];
  return `[src] ${parts.join('|')}`;
}

/** Five UTM params for HubSpot contact properties / Sheet / Firestore. */
export function utmFieldValues(attr: AttributionSnapshot = getAttribution()): {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
} {
  return {
    utm_source: attr.utm_source || '',
    utm_medium: attr.utm_medium || '',
    utm_campaign: attr.utm_campaign || '',
    utm_content: attr.utm_content || '',
    utm_term: attr.utm_term || '',
  };
}

/** Append first-touch raw line to a challenge/message for Google Sheet rows. */
export function withAttributionInText(message: string | undefined | null): string {
  const raw = attributionRawLine();
  const base = (message || '').trim();
  if (!base) return raw;
  const combined = `${base}\n\n${raw}`;
  return combined.length > 65000 ? combined.slice(0, 65000) : combined;
}

/** Flat fields to merge into Sheet FormData / Firestore docs. */
export function attributionExportFields(
  attr: AttributionSnapshot = getAttribution(),
): Record<string, string> {
  const utm = utmFieldValues(attr);
  return {
    ...utm,
    convertx_lead_source_detail: mapLeadSource(attr),
    attribution_raw: attributionRawLine(attr),
  };
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
  safeSetSession(PACKAGE_KEY, resolved);
  const lower = raw.trim().toLowerCase();
  if (lower.includes('funnel audit')) {
    safeSetSession(OFFER_HINT_KEY, 'funnel_audit');
  }
}

export function getPackageInterest(): PackageInterest {
  const stored = safeGetSession(PACKAGE_KEY);
  return resolvePackageInterest(stored || 'undecided');
}

export function getOfferHint(): ConvertxOffer | null {
  const v = safeGetSession(OFFER_HINT_KEY);
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

/** Storage key shared with public/js/cx-hubspot.js — do not rename without migrating. */
export const ATTRIBUTION_STORAGE_KEY = ATTR_KEY;
