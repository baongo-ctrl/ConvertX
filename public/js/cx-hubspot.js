/**
 * ConvertX HubSpot dual-write + attribution for static HTML pages.
 * Soft-fails when form GUIDs are missing / REPLACE_ME.
 * Apps Script payloads must stay unchanged — call CXHubSpot.submit after that POST.
 */
(function (window, document) {
  'use strict';

  var PORTAL_ID = '247838082';
  var ATTR_KEY = 'cx-attr-v1';
  var PACKAGE_KEY = 'cx-package-interest';
  var OFFER_HINT_KEY = 'cx-offer-hint';
  var TIMEOUT_MS = 8000;

  window.CX_HS = window.CX_HS || {
    portalId: PORTAL_ID,
    forms: {
      contact: '98c275d7-4f86-491b-8680-75e745f6dd13',
      event: '75ffdf25-ce73-4a8b-ada0-67c0f20f2b77',
      resource: '852bb154-4735-4c5a-9df2-6e83a2c8dac7',
      chat: '46a3cbed-64d9-4c4e-b2d5-b0dbc7ef9ad8'
    }
  };

  var PACKAGE_BY_LABEL = {
    'b2b launch kit': 'launch_kit',
    'b2b launch kit (brand kickstart)': 'launch_kit',
    'growth engine': 'growth_engine',
    'growth engine (b2b customer growth)': 'growth_engine',
    'thought leadership program': 'thought_leadership',
    'thought leadership program (ceo/founder branding)': 'thought_leadership',
    'b2b event & partnership accelerator': 'event_accelerator',
    'crm + automation optimization': 'crm_automation',
    'market intelligence & brand strategy': 'market_intelligence',
    'growth loop': 'growth_engine',
    'startup launch combo': 'launch_kit',
    'growth loop combo': 'growth_engine',
    'brand repositioning combo': 'market_intelligence',
    'free funnel audit': 'undecided',
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
    undecided: 'undecided'
  };

  function safeGet(key) {
    try { return sessionStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { sessionStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  function param(params, name) {
    return (params.get(name) || '').trim().slice(0, 200);
  }

  function captureAttribution() {
    var existing = safeGet(ATTR_KEY);
    if (existing) {
      try { return JSON.parse(existing); } catch (e) { /* recapture */ }
    }
    var params = new URLSearchParams(window.location.search);
    var snap = {
      utm_source: param(params, 'utm_source'),
      utm_medium: param(params, 'utm_medium'),
      utm_campaign: param(params, 'utm_campaign'),
      gclid: param(params, 'gclid'),
      fbclid: param(params, 'fbclid'),
      li_fat_id: param(params, 'li_fat_id'),
      referrer: (document.referrer || '').slice(0, 500),
      landing: (window.location.pathname + window.location.search).slice(0, 500)
    };
    safeSet(ATTR_KEY, JSON.stringify(snap));
    var pkgParam = param(params, 'package');
    if (pkgParam) setPackageInterest(pkgParam);
    return snap;
  }

  function resolvePackageInterest(raw) {
    if (!raw) return 'undecided';
    var key = String(raw).trim().toLowerCase();
    if (PACKAGE_BY_LABEL[key]) return PACKAGE_BY_LABEL[key];
    if (key.indexOf('launch') !== -1) return 'launch_kit';
    if (key.indexOf('growth engine') !== -1 || key === 'growth' || key.indexOf('growth loop') !== -1) return 'growth_engine';
    if (key.indexOf('thought') !== -1) return 'thought_leadership';
    if (key.indexOf('event') !== -1) return 'event_accelerator';
    if (key.indexOf('crm') !== -1 || key.indexOf('automation') !== -1) return 'crm_automation';
    if (key.indexOf('intelligence') !== -1 || key.indexOf('market') !== -1) return 'market_intelligence';
    return 'undecided';
  }

  function setPackageInterest(raw) {
    safeSet(PACKAGE_KEY, resolvePackageInterest(raw));
    if (String(raw).toLowerCase().indexOf('funnel audit') !== -1) {
      safeSet(OFFER_HINT_KEY, 'funnel_audit');
    }
  }

  function getPackageInterest() {
    return resolvePackageInterest(safeGet(PACKAGE_KEY) || 'undecided');
  }

  function getOfferHint() {
    var v = safeGet(OFFER_HINT_KEY);
    return v || null;
  }

  function mapLeadSource(attr) {
    attr = attr || captureAttribution();
    var src = (attr.utm_source || '').toLowerCase();
    var med = (attr.utm_medium || '').toLowerCase();
    var ref = (attr.referrer || '').toLowerCase();
    var landing = (attr.landing || '').toLowerCase();
    if (attr.gclid || (src.indexOf('google') !== -1 && /^(cpc|ppc|paid|paidsearch)$/.test(med))) return 'google_ads';
    if (attr.li_fat_id || src.indexOf('linkedin') !== -1 || ref.indexOf('linkedin.com') !== -1) return 'linkedin';
    if (src.indexOf('zalo') !== -1 || med.indexOf('zalo') !== -1 || ref.indexOf('zalo') !== -1) return 'zalo_oa';
    if (med === 'partner' || src === 'partner') return 'partner';
    if (med === 'referral') return 'referral';
    if (med === 'email' || med === 'outbound' || src === 'outbound') return 'outbound';
    var hosts = ['google.', 'bing.', 'coccoc.', 'yahoo.', 'duckduckgo.'];
    for (var i = 0; i < hosts.length; i++) {
      if (ref.indexOf(hosts[i]) !== -1) return 'organic_blog';
    }
    if (landing.indexOf('/blog') !== -1) return 'organic_blog';
    if (ref && ref.indexOf(window.location.hostname) === -1) return 'referral';
    return 'other';
  }

  function attributionRawLine(attr) {
    attr = attr || captureAttribution();
    return '[src] utm_source=' + (attr.utm_source || '-') +
      '|utm_medium=' + (attr.utm_medium || '-') +
      '|utm_campaign=' + (attr.utm_campaign || '-') +
      '|gclid=' + (attr.gclid || '-') +
      '|ref=' + (attr.referrer || '-') +
      '|landing=' + (attr.landing || '-');
  }

  function detectHsLanguage(pathname) {
    pathname = pathname || window.location.pathname;
    if (pathname === '/en' || pathname.indexOf('/en/') === 0 || pathname.indexOf('/convertx-vs-agency/en') === 0) {
      return 'en';
    }
    return 'vi';
  }

  function splitPersonName(fullName, language) {
    var parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return { firstname: '', lastname: '' };
    if (parts.length === 1) return { firstname: parts[0], lastname: '' };
    if (language === 'vi') {
      return { lastname: parts[0], firstname: parts.slice(1).join(' ') };
    }
    return { firstname: parts[0], lastname: parts.slice(1).join(' ') };
  }

  function readCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : undefined;
  }

  function isPlaceholder(guid) {
    return !guid || guid === 'REPLACE_ME' || /^replace/i.test(guid);
  }

  function field(name, value) {
    if (value == null) return null;
    var v = String(value).trim();
    if (!v) return null;
    return { objectTypeId: '0-1', name: name, value: v };
  }

  function collect(list) {
    var out = [];
    for (var i = 0; i < list.length; i++) if (list[i]) out.push(list[i]);
    return out;
  }

  function appendRaw(message, raw) {
    var base = String(message || '').trim();
    var combined = base ? base + '\n\n' + raw : raw;
    return combined.length > 65000 ? combined.slice(0, 65000) : combined;
  }

  function bindPackageCtas() {
    var nodes = document.querySelectorAll('[data-cx-package], [data-interest]');
    for (var i = 0; i < nodes.length; i++) {
      (function (el) {
        el.addEventListener('click', function () {
          var raw = el.getAttribute('data-cx-package') || el.getAttribute('data-interest') || '';
          if (raw) setPackageInterest(raw);
        });
      })(nodes[i]);
    }
  }

  function buildContactFields(formEl) {
    var fd = new FormData(formEl);
    var lang = detectHsLanguage();
    var name = String(fd.get('name') || '');
    var names = splitPersonName(name, lang);
    var segment = String(fd.get('convertx_segment') || '').trim();
    var zalo = fd.get('zalo_oa_opt_in') === 'true' || fd.get('zalo_oa_opt_in') === 'on';
    var offer = getOfferHint() || 'other';
    var raw = attributionRawLine();
    return collect([
      field('email', fd.get('email')),
      field('firstname', names.firstname),
      field('lastname', names.lastname),
      field('phone', fd.get('phone')),
      field('company', fd.get('company')),
      field('message', appendRaw(fd.get('challenge'), raw)),
      field('hs_language', lang),
      field('convertx_intent', 'decision'),
      field('convertx_offer', offer),
      field('convertx_lead_source_detail', mapLeadSource()),
      field('convertx_package_interest', getPackageInterest()),
      (segment === 'b2b_saas' || segment === 'b2b_professional_services') ? field('convertx_segment', segment) : null,
      field('zalo_oa_opt_in', zalo ? 'true' : 'false')
    ]);
  }

  function postHubSpot(formKey, fields) {
    var guid = (window.CX_HS.forms && window.CX_HS.forms[formKey]) || '';
    if (isPlaceholder(guid)) {
      console.warn('[HubSpot] Skipping ' + formKey + ': form GUID not configured');
      return Promise.resolve();
    }
    var hutk = readCookie('hubspotutk');
    var context = { pageUri: window.location.href, pageName: document.title || '' };
    if (hutk) context.hutk = hutk;
    captureAttribution();

    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = window.setTimeout(function () {
      if (controller) controller.abort();
    }, TIMEOUT_MS);

    var opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: fields, context: context }),
      keepalive: true
    };
    if (controller) opts.signal = controller.signal;

    return fetch(
      'https://api.hsforms.com/submissions/v3/integration/submit/' + PORTAL_ID + '/' + guid,
      opts
    ).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) {
          console.warn('[HubSpot] ' + formKey + ' submit failed: ' + res.status, (t || '').slice(0, 300));
        }).catch(function () {});
      }
    }).catch(function (err) {
      console.warn('[HubSpot] ' + formKey + ' submit error:', err);
    }).then(function () {
      window.clearTimeout(timer);
    });
  }

  function submit(formKey, formEl) {
    try {
      var fields;
      if (formKey === 'contact') {
        fields = buildContactFields(formEl || document.getElementById('cx-contact'));
      } else {
        console.warn('[HubSpot] Unknown form key for static helper:', formKey);
        return Promise.resolve();
      }
      return postHubSpot(formKey, fields);
    } catch (err) {
      console.warn('[HubSpot] submit unexpected error:', err);
      return Promise.resolve();
    }
  }

  function init() {
    captureAttribution();
    bindPackageCtas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.CXHubSpot = {
    submit: submit,
    captureAttribution: captureAttribution,
    setPackageInterest: setPackageInterest,
    getPackageInterest: getPackageInterest,
    mapLeadSource: mapLeadSource
  };
})(window, document);
