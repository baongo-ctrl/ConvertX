import https from 'https';

const urls = [
  'https://classin.vn/wp-content/uploads/2022/07/ClassIn-Logo-1.png',
  'https://geekup.vn/Icons/geekup-logo-general.svg',
  'https://circo.co/wp-content/uploads/2023/11/logo-circo.svg',
  'https://wego.net.vn/wp-content/uploads/2021/08/logo-wego-1.png'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${url}: ${res.statusCode}`);
  }).on('error', (e) => {
    console.log(`${url}: Error ${e.message}`);
  });
});
