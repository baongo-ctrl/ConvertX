/**
 * First-touch localStorage persistence tests with a minimal DOM/storage mock.
 */
const store: Record<string, string> = {};
const session: Record<string, string> = {};

(globalThis as any).localStorage = {
  getItem: (k: string) => (k in store ? store[k] : null),
  setItem: (k: string, v: string) => {
    store[k] = String(v);
  },
  removeItem: (k: string) => {
    delete store[k];
  },
};
(globalThis as any).sessionStorage = {
  getItem: (k: string) => (k in session ? session[k] : null),
  setItem: (k: string, v: string) => {
    session[k] = String(v);
  },
  removeItem: (k: string) => {
    delete session[k];
  },
};

let href = 'https://convertx.biz/?utm_source=linkedin&utm_medium=social-dm&utm_campaign=test&utm_content=b2boutreach-step1&utm_term=1a';
let referrer = '';
(globalThis as any).window = {
  get location() {
    const u = new URL(href);
    return {
      href,
      search: u.search,
      pathname: u.pathname,
      hostname: u.hostname,
    };
  },
};
(globalThis as any).document = {
  get referrer() {
    return referrer;
  },
  readyState: 'complete',
  addEventListener() {},
  querySelectorAll() {
    return [];
  },
};

const {
  captureAttribution,
  mapLeadSource,
  attributionRawLine,
  ATTRIBUTION_STORAGE_KEY,
} = await import('../src/lib/attribution.ts');

let failed = 0;
function expect(name: string, actual: unknown, expected: unknown) {
  const ok = actual === expected;
  if (!ok) {
    console.error('FAIL', name, actual, '!=', expected);
    failed++;
  } else console.log('OK  ', name);
}

const first = captureAttribution();
expect('first touch source', first.utm_source, 'linkedin');
expect('first touch content', first.utm_content, 'b2boutreach-step1');
expect('first touch term', first.utm_term, '1a');
expect('map linkedin', mapLeadSource(first), 'linkedin');
expect('storage key', ATTRIBUTION_STORAGE_KEY, 'cx-attr-v1');
expect('stored in localStorage', Boolean(store['cx-attr-v1']), true);

// Navigate without UTMs — must keep first touch
href = 'https://convertx.biz/about';
referrer = 'https://convertx.biz/?utm_source=linkedin&utm_medium=social-dm&utm_campaign=test&utm_content=b2boutreach-step1&utm_term=1a';
const second = captureAttribution();
expect('persisted source after clean nav', second.utm_source, 'linkedin');
expect('persisted medium', second.utm_medium, 'social-dm');
expect('persisted content', second.utm_content, 'b2boutreach-step1');
expect('map still linkedin', mapLeadSource(second), 'linkedin');
const raw = attributionRawLine(second);
expect('raw still has content', raw.includes('utm_content=b2boutreach-step1'), true);

// Empty direct visit must not wipe first touch
href = 'https://convertx.biz/';
referrer = '';
const third = captureAttribution();
expect('empty visit keeps linkedin', third.utm_source, 'linkedin');

// Fresh browser: empty first, then UTM upgrade
delete store['cx-attr-v1'];
href = 'https://convertx.biz/';
const emptyFirst = captureAttribution();
expect('empty first has no source', emptyFirst.utm_source, '');
href =
  'https://convertx.biz/?utm_source=gmail&utm_medium=outreach&utm_campaign=growth-engine-2026-11&utm_content=b2b-outreach-step1&utm_term=1a';
const upgraded = captureAttribution();
expect('upgrade to gmail', upgraded.utm_source, 'gmail');
expect('upgrade map outbound', mapLeadSource(upgraded), 'outbound');

if (failed) {
  console.error(failed + ' failed');
  process.exit(1);
}
console.log('All first-touch tests passed');
