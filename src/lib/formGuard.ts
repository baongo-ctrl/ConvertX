export type Language = 'en' | 'vi';

const CONTACT_FALLBACK =
  'https://script.google.com/macros/s/AKfycbzx3HtLaLphdm4kx81FhY7-nwm_pCQT0eQY6EQisBz5b-DtnlMiOfDfNG56fhEUoXim4w/exec';
const EVENT_FALLBACK =
  'https://script.google.com/macros/s/AKfycbxW029oCCiUgriRu-v988S6HPVnc6T5pVqgrChFnTop4qDLoBvcepn93ZldaePe5Dqg/exec';

function envOrFallback(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

const viteEnv = import.meta.env;

export const CONTACT_SCRIPT_URL = envOrFallback(
  viteEnv?.VITE_CONTACT_SCRIPT_URL,
  CONTACT_FALLBACK,
);
export const EVENT_SCRIPT_URL = envOrFallback(
  viteEnv?.VITE_EVENT_SCRIPT_URL,
  EVENT_FALLBACK,
);

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const HOUR_MS = 60 * 60 * 1000;
const STORAGE_PREFIX = 'cx-submit:';

const messages = {
  en: {
    tooFast: 'Please wait a few seconds before submitting.',
    throttled: 'You recently submitted this form. Please wait a few minutes and try again.',
    name: 'Enter a name using 120 characters or fewer.',
    personName: 'Enter a first and last name, 80 characters or fewer each.',
    email: 'Enter a valid email address (100 characters or fewer).',
    phone: 'Enter a valid phone number.',
    company: 'Enter a company name using 200 characters or fewer.',
    challenge: 'Describe the challenge in 2,000 characters or fewer.',
    message: 'Enter a message using 2,000 characters or fewer.',
    role: 'Choose a role.',
  },
  vi: {
    tooFast: 'Vui lòng đợi vài giây rồi gửi lại.',
    throttled: 'Bạn vừa gửi biểu mẫu này. Vui lòng đợi một lát rồi thử lại.',
    name: 'Nhập họ tên không quá 120 ký tự.',
    personName: 'Nhập họ và tên, mỗi phần không quá 80 ký tự.',
    email: 'Nhập email hợp lệ, không quá 100 ký tự.',
    phone: 'Nhập số điện thoại hợp lệ.',
    company: 'Nhập tên công ty không quá 200 ký tự.',
    challenge: 'Mô tả thách thức không quá 2.000 ký tự.',
    message: 'Nhập nội dung không quá 2.000 ký tự.',
    role: 'Chọn chức vụ.',
  },
} as const;

export type SubmissionGate =
  | { action: 'send' }
  | { action: 'drop' }
  | { action: 'block'; message: string };

type GateOptions = {
  lang: Language;
  key: string;
  startedAt: number;
  honeypot: string;
  minFillMs?: number;
  minGapMs?: number;
  maxPerHour?: number;
  now?: number;
};

function readStamps(key: string, now: number): number[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { stamps?: unknown };
    if (!parsed || !Array.isArray(parsed.stamps)) return [];
    return parsed.stamps.filter(
      (stamp): stamp is number => typeof stamp === 'number' && now - stamp < HOUR_MS,
    );
  } catch {
    return [];
  }
}

export function recordSubmission(key: string, now = Date.now()) {
  if (typeof localStorage === 'undefined') return;
  try {
    const stamps = readStamps(key, now);
    stamps.push(now);
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify({ stamps }));
  } catch {
    // Best-effort. A full or blocked store should not stop a real inquiry.
  }
}

export function gateSubmission(options: GateOptions): SubmissionGate {
  const now = options.now ?? Date.now();
  const minFillMs = options.minFillMs ?? 3000;
  const minGapMs = options.minGapMs ?? 20_000;
  const maxPerHour = options.maxPerHour ?? 5;
  const copy = messages[options.lang];

  if (options.honeypot.trim().length > 0) return { action: 'drop' };
  if (now - options.startedAt < minFillMs) {
    return { action: 'block', message: copy.tooFast };
  }

  const stamps = readStamps(options.key, now);
  const last = stamps.length > 0 ? Math.max(...stamps) : 0;
  if ((last > 0 && now - last < minGapMs) || stamps.length >= maxPerHour) {
    return { action: 'block', message: copy.throttled };
  }
  return { action: 'send' };
}

function hasControlChars(value: string): boolean {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value);
}

function readLine(value: unknown, max: number): string | null {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  if (!text || text.length > max || hasControlChars(text)) return null;
  return text;
}

function readBlock(value: unknown, max: number): string | null {
  const text = String(value ?? '').replace(/\r\n/g, '\n').trim();
  if (!text || text.length > max || hasControlChars(text)) return null;
  return text;
}

export function isValidEmail(value: string): boolean {
  return value.length <= 100 && EMAIL_RE.test(value);
}

function isValidPhone(value: string): boolean {
  if (value.length < 8 || value.length > 30) return false;
  if (!/^\+?[0-9][0-9\s().-]*$/.test(value)) return false;
  const digits = value.replace(/\D/g, '').length;
  return digits >= 8 && digits <= 15;
}

const EVENT_ROLES = new Set(['ceo', 'marketing', 'sales', 'other']);

export type ContactLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  challenge: string;
};

export function parseContactLead(
  formData: FormData,
  lang: Language,
): { lead: ContactLead } | { error: string } {
  const copy = messages[lang];
  const name = readLine(formData.get('name'), 120);
  const email = readLine(formData.get('email'), 100);
  const phone = readLine(formData.get('phone'), 30);
  const company = readLine(formData.get('company'), 200);
  const challenge = readBlock(formData.get('challenge'), 2000);

  if (!name) return { error: copy.name };
  if (!email || !isValidEmail(email)) return { error: copy.email };
  if (!phone || !isValidPhone(phone)) return { error: copy.phone };
  if (!company) return { error: copy.company };
  if (!challenge) return { error: copy.challenge };

  return { lead: { name, email, phone, company, challenge } };
}

export type EventLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
};

export function parseEventLead(
  formData: FormData,
  lang: Language,
): { lead: EventLead } | { error: string } {
  const copy = messages[lang];
  const firstName = readLine(formData.get('firstName'), 80);
  const lastName = readLine(formData.get('lastName'), 80);
  const email = readLine(formData.get('email'), 100);
  const phone = readLine(formData.get('phone'), 30);
  const company = readLine(formData.get('company'), 200);
  const role = readLine(formData.get('role'), 40);

  if (!firstName || !lastName) return { error: copy.personName };
  if (!email || !isValidEmail(email)) return { error: copy.email };
  if (!phone || !isValidPhone(phone)) return { error: copy.phone };
  if (!company) return { error: copy.company };
  if (!role || !EVENT_ROLES.has(role)) return { error: copy.role };

  return {
    lead: {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      company,
      role,
    },
  };
}

export function parseChat(
  emailValue: string,
  messageValue: string,
  lang: Language,
): { email: string; message: string } | { error: string } {
  const copy = messages[lang];
  const email = readLine(emailValue, 100);
  const message = readBlock(messageValue, 2000);
  if (!email || !isValidEmail(email)) return { error: copy.email };
  if (!message) return { error: copy.message };
  return { email, message };
}

export function parseResourceEmail(
  emailValue: string,
  lang: Language,
): { email: string } | { error: string } {
  const email = readLine(emailValue, 100);
  if (!email || !isValidEmail(email)) return { error: messages[lang].email };
  return { email };
}

export async function postToAppsScript(
  url: string,
  fields: Record<string, string>,
): Promise<void> {
  const body = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    body.append(key, value);
  }
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body,
  });
}
