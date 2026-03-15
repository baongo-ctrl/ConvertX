import https from 'https';

const domains = ['classin.com', 'geekup.vn', 'circo.co', 'wego.vn'];

domains.forEach(domain => {
  https.get(`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=128`, (res) => {
    console.log(`${domain}: ${res.statusCode}`);
  });
});
