import https from 'https';

const domains = ['classin.com', 'geekup.vn', 'circo.co', 'wego.com'];

domains.forEach(domain => {
  https.get(`https://logo.clearbit.com/${domain}`, (res) => {
    console.log(`${domain}: ${res.statusCode}`);
  });
});
