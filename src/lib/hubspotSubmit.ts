import {
  attributionRawLine,
  detectHsLanguage,
  getAttribution,
  getOfferHint,
  getPackageInterest,
  mapLeadSource,
  offerForResource,
  roleToJobtitle,
  splitPersonName,
  webinarNameToHubspot,
  type ConvertxOffer,
  type PackageInterest,
} from './attribution';

export type HubSpotFormKey = 'contact' | 'event' | 'resource' | 'chat';

type HsField = { objectTypeId: string; name: string; value: string };

const PORTAL_ID = '247838082';
const OBJECT_CONTACT = '0-1';
const TIMEOUT_MS = 8000;

/** Public form GUIDs (also appear in HubSpot embed code). Env vars override. */
const DEFAULT_FORM_GUIDS: Record<HubSpotFormKey, string> = {
  contact: '98c275d7-4f86-491b-8680-75e745f6dd13',
  event: '75ffdf25-ce73-4a8b-ada0-67c0f20f2b77',
  resource: '852bb154-4735-4c5a-9df2-6e83a2c8dac7',
  chat: '46a3cbed-64d9-4c4e-b2d5-b0dbc7ef9ad8',
};

function resolveGuid(key: HubSpotFormKey, envValue: string | undefined): string {
  const trimmed = (envValue || '').trim();
  if (trimmed && trimmed !== 'REPLACE_ME') return trimmed;
  return DEFAULT_FORM_GUIDS[key];
}

const FORM_GUIDS: Record<HubSpotFormKey, string> = {
  contact: resolveGuid('contact', import.meta.env.VITE_HS_FORM_CONTACT),
  event: resolveGuid('event', import.meta.env.VITE_HS_FORM_EVENT),
  resource: resolveGuid('resource', import.meta.env.VITE_HS_FORM_RESOURCE),
  chat: resolveGuid('chat', import.meta.env.VITE_HS_FORM_CHAT),
};

function isPlaceholderGuid(guid: string): boolean {
  return !guid || guid === 'REPLACE_ME' || /^replace/i.test(guid);
}

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function field(name: string, value: string | undefined | null): HsField | null {
  if (value == null) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  return { objectTypeId: OBJECT_CONTACT, name, value: trimmed };
}

function collect(fields: Array<HsField | null>): HsField[] {
  return fields.filter((f): f is HsField => Boolean(f));
}

function appendRawToMessage(message: string | undefined, raw: string): string {
  const base = (message || '').trim();
  if (!base) return raw;
  // Keep under a reasonable HubSpot message length
  const combined = `${base}\n\n${raw}`;
  return combined.length > 65000 ? combined.slice(0, 65000) : combined;
}

export type ContactHsPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  challenge: string;
  segment?: string;
  zaloOptIn?: boolean;
  language?: 'en' | 'vi';
  packageInterest?: PackageInterest;
  offer?: ConvertxOffer;
};

export type EventHsPayload = {
  formFirstName: string;
  formLastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  segment?: string;
  zaloOptIn?: boolean;
  formType?: string;
};

export type ResourceHsPayload = {
  email: string;
  resourceTitle: string;
  /** Optional; resource UI has no segment today — only sent when present. */
  segment?: string;
};

export type ChatHsPayload = {
  email: string;
  message: string;
};

function buildContactFields(p: ContactHsPayload): HsField[] {
  const lang = p.language ?? detectHsLanguage();
  const { firstname, lastname } = splitPersonName(p.name, lang);
  const offer = p.offer ?? getOfferHint() ?? 'other';
  const pkg = p.packageInterest ?? getPackageInterest();
  const raw = attributionRawLine();
  return collect([
    field('email', p.email),
    field('firstname', firstname),
    field('lastname', lastname),
    field('phone', p.phone),
    field('company', p.company),
    field('message', appendRawToMessage(p.challenge, raw)),
    field('hs_language', lang),
    field('convertx_intent', 'decision'),
    field('convertx_offer', offer),
    field('convertx_lead_source_detail', mapLeadSource()),
    field('convertx_package_interest', pkg),
    p.segment ? field('convertx_segment', p.segment) : null,
    field('zalo_oa_opt_in', p.zaloOptIn ? 'true' : 'false'),
  ]);
}

function buildEventFields(p: EventHsPayload): HsField[] {
  const names = webinarNameToHubspot(p.formFirstName, p.formLastName);
  const raw = attributionRawLine();
  const note = p.formType ? `Form: ${p.formType}` : 'Webinar / event';
  return collect([
    field('email', p.email),
    field('firstname', names.firstname),
    field('lastname', names.lastname),
    field('phone', p.phone),
    field('company', p.company),
    field('jobtitle', roleToJobtitle(p.role)),
    field('message', appendRawToMessage(note, raw)),
    field('hs_language', 'vi'),
    field('convertx_intent', 'consideration'),
    field('convertx_offer', 'event_webinar'),
    field('convertx_lead_source_detail', mapLeadSource()),
    p.segment ? field('convertx_segment', p.segment) : null,
    field('zalo_oa_opt_in', p.zaloOptIn ? 'true' : 'false'),
  ]);
}

function buildResourceFields(p: ResourceHsPayload): HsField[] {
  const raw = attributionRawLine();
  return collect([
    field('email', p.email),
    field('message', appendRawToMessage(`Resource: ${p.resourceTitle}`, raw)),
    field('hs_language', detectHsLanguage()),
    field('convertx_intent', 'awareness'),
    field('convertx_offer', offerForResource(p.resourceTitle)),
    field('convertx_lead_source_detail', mapLeadSource()),
    p.segment ? field('convertx_segment', p.segment) : null,
  ]);
}

function buildChatFields(p: ChatHsPayload): HsField[] {
  const raw = attributionRawLine();
  return collect([
    field('email', p.email),
    field('message', appendRawToMessage(p.message, raw)),
    field('hs_language', detectHsLanguage()),
    field('convertx_intent', 'consideration'),
    field('convertx_lead_source_detail', mapLeadSource()),
  ]);
}

async function postHubSpot(formKey: HubSpotFormKey, fields: HsField[]): Promise<void> {
  const guid = FORM_GUIDS[formKey];
  if (isPlaceholderGuid(guid)) {
    console.warn(`[HubSpot] Skipping ${formKey}: form GUID not configured`);
    return;
  }

  const hutk = readCookie('hubspotutk');
  const context: { pageUri: string; pageName: string; hutk?: string } = {
    pageUri: window.location.href,
    pageName: document.title || '',
  };
  if (hutk) context.hutk = hutk;

  // Touch attribution so landing is recorded even if init was missed
  getAttribution();

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${guid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, context }),
        keepalive: true,
        signal: controller.signal,
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.warn(`[HubSpot] ${formKey} submit failed: ${res.status}`, text.slice(0, 300));
    }
  } catch (err) {
    console.warn(`[HubSpot] ${formKey} submit error:`, err);
  } finally {
    window.clearTimeout(timer);
  }
}

/** Soft-fail HubSpot dual-write. Never throws to callers. */
export async function submitHubSpotContact(payload: ContactHsPayload): Promise<void> {
  try {
    await postHubSpot('contact', buildContactFields(payload));
  } catch (err) {
    console.warn('[HubSpot] contact unexpected error:', err);
  }
}

export async function submitHubSpotEvent(payload: EventHsPayload): Promise<void> {
  try {
    await postHubSpot('event', buildEventFields(payload));
  } catch (err) {
    console.warn('[HubSpot] event unexpected error:', err);
  }
}

export async function submitHubSpotResource(payload: ResourceHsPayload): Promise<void> {
  try {
    await postHubSpot('resource', buildResourceFields(payload));
  } catch (err) {
    console.warn('[HubSpot] resource unexpected error:', err);
  }
}

export async function submitHubSpotChat(payload: ChatHsPayload): Promise<void> {
  try {
    await postHubSpot('chat', buildChatFields(payload));
  } catch (err) {
    console.warn('[HubSpot] chat unexpected error:', err);
  }
}

export function readSegment(formData: FormData): string | undefined {
  const v = String(formData.get('convertx_segment') ?? '').trim();
  if (v === 'b2b_saas' || v === 'b2b_professional_services') return v;
  return undefined;
}

export function readZaloOptIn(formData: FormData): boolean {
  return String(formData.get('zalo_oa_opt_in') ?? '') === 'true' ||
    formData.get('zalo_oa_opt_in') === 'on';
}
