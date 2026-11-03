import {
  mapLeadSource,
  attributionRawLine,
  hasMarketingSignal,
  utmFieldValues,
  type AttributionSnapshot,
} from '../src/lib/attribution.ts';

function snap(partial: Partial<AttributionSnapshot>): AttributionSnapshot {
  return {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    gclid: '',
    fbclid: '',
    li_fat_id: '',
    referrer: '',
    landing: '/',
    ...partial,
  };
}

let failed = 0;
function expect(name: string, actual: unknown, expected: unknown) {
  if (actual !== expected) {
    console.error('FAIL', name, 'got', JSON.stringify(actual), 'expected', JSON.stringify(expected));
    failed++;
  } else {
    console.log('OK  ', name, '->', actual);
  }
}

expect(
  'gmail+outreach => outbound',
  mapLeadSource(
    snap({
      utm_source: 'gmail',
      utm_medium: 'outreach',
      utm_campaign: 'growth-engine-2026-11',
      utm_content: 'b2b-outreach-step1',
      utm_term: '1a',
    }),
  ),
  'outbound',
);

expect(
  'linkedin+social-dm => linkedin',
  mapLeadSource(
    snap({
      utm_source: 'linkedin',
      utm_medium: 'social-dm',
      utm_campaign: 'test',
      utm_content: 'b2boutreach-step1',
      utm_term: '1a',
    }),
  ),
  'linkedin',
);

expect(
  'whatsapp+chat+b2b-outreach => outbound',
  mapLeadSource(
    snap({
      utm_source: 'whatsapp',
      utm_medium: 'chat',
      utm_content: 'b2b-outreach-step1',
      utm_term: '2a',
    }),
  ),
  'outbound',
);

expect(
  'whatsapp+chat+sales- => outbound',
  mapLeadSource(snap({ utm_source: 'whatsapp', utm_medium: 'chat', utm_content: 'sales-intro' })),
  'outbound',
);

expect(
  'whatsapp+chat+other content => other',
  mapLeadSource(snap({ utm_source: 'whatsapp', utm_medium: 'chat', utm_content: 'nurture-d3' })),
  'other',
);

expect(
  'reddit+platform-msg => other',
  mapLeadSource(snap({ utm_source: 'reddit', utm_medium: 'platform-msg' })),
  'other',
);

expect(
  'upwork => other',
  mapLeadSource(snap({ utm_source: 'upwork', utm_medium: 'platform-msg' })),
  'other',
);

expect(
  'linkedin+social-post => linkedin (src wins)',
  mapLeadSource(snap({ utm_source: 'linkedin', utm_medium: 'social-post' })),
  'linkedin',
);

expect(
  'social-post non-linkedin => other',
  mapLeadSource(snap({ utm_source: 'facebook', utm_medium: 'social-post' })),
  'other',
);

expect(
  'zalo+chat => zalo_oa',
  mapLeadSource(snap({ utm_source: 'zalo', utm_medium: 'chat' })),
  'zalo_oa',
);

expect(
  'partner medium => partner',
  mapLeadSource(snap({ utm_source: 'acme', utm_medium: 'partner' })),
  'partner',
);

expect(
  'partner source => partner',
  mapLeadSource(snap({ utm_source: 'partner', utm_medium: 'referral' })),
  'partner',
);

expect(
  'referral medium => referral',
  mapLeadSource(snap({ utm_source: 'friend', utm_medium: 'referral' })),
  'referral',
);

expect(
  'gclid => google_ads',
  mapLeadSource(snap({ gclid: 'abc' })),
  'google_ads',
);

expect(
  'gmail src alone => outbound (beats mail.google referrer)',
  mapLeadSource(
    snap({
      utm_source: 'gmail',
      utm_medium: '',
      referrer: 'https://mail.google.com/',
    }),
  ),
  'outbound',
);

expect(
  'outreach medium alone => outbound',
  mapLeadSource(snap({ utm_source: 'newsletter', utm_medium: 'outreach' })),
  'outbound',
);

expect(
  'case normalize LINKEDIN',
  mapLeadSource(snap({ utm_source: 'LinkedIn', utm_medium: 'Social-DM' })),
  'linkedin',
);

expect(
  'luma => other',
  mapLeadSource(snap({ utm_source: 'luma', utm_medium: 'platform-msg' })),
  'other',
);

expect(
  'designrush + social-dm => other',
  mapLeadSource(snap({ utm_source: 'designrush', utm_medium: 'social-dm' })),
  'other',
);

expect(
  'freelancer => other',
  mapLeadSource(snap({ utm_source: 'freelancer', utm_medium: 'platform-msg' })),
  'other',
);

const raw = attributionRawLine(
  snap({
    utm_source: 'gmail',
    utm_medium: 'outreach',
    utm_campaign: 'growth-engine-2026-11',
    utm_content: 'b2b-outreach-step1',
    utm_term: '1a',
  }),
);
expect('raw contains utm_content', raw.includes('utm_content=b2b-outreach-step1'), true);
expect('raw contains utm_term', raw.includes('utm_term=1a'), true);

expect('hasMarketingSignal true', hasMarketingSignal(snap({ utm_source: 'gmail' })), true);
expect('hasMarketingSignal false', hasMarketingSignal(snap({})), false);

const utm = utmFieldValues(
  snap({
    utm_source: 'gmail',
    utm_medium: 'outreach',
    utm_campaign: 'c',
    utm_content: 'x',
    utm_term: '1a',
  }),
);
expect('utmFieldValues source', utm.utm_source, 'gmail');
expect('utmFieldValues term', utm.utm_term, '1a');

if (failed) {
  console.error('\n' + failed + ' failed');
  process.exit(1);
}
console.log('\nAll mapping tests passed');
