import https from 'https';

const fetchHtml = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchHtml(res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
};

async function run() {
  const sites = [
    { name: 'ClassIn', url: 'https://www.classin.com/' },
    { name: 'GeekUp', url: 'https://geekup.vn/' },
    { name: 'cirCO', url: 'https://circo.co/' },
    { name: 'Wego', url: 'https://www.wego.com/' }
  ];

  for (const site of sites) {
    try {
      const html = await fetchHtml(site.url);
      const matches = html.match(/<img[^>]+src="([^">]+logo[^">]+)"/i);
      if (matches) {
        console.log(`${site.name}: ${matches[1]}`);
      } else {
        const matches2 = html.match(/<img[^>]+src="([^">]+)"[^>]*alt="[^"]*logo[^"]*"/i);
        if (matches2) {
          console.log(`${site.name}: ${matches2[1]}`);
        } else {
          console.log(`${site.name}: Not found`);
        }
      }
    } catch (e) {
      console.log(`${site.name}: Error ${e.message}`);
    }
  }
}

run();
