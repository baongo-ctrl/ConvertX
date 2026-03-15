import https from 'https';

const getDirectUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (match) {
          resolve(match[1]);
        } else {
          resolve(`Not found for ${url}`);
        }
      });
    });
  });
};

async function run() {
  const urls = [
    'https://ibb.co/ZzD5dVQW'
  ];
  for (const url of urls) {
    console.log(await getDirectUrl(url));
  }
}

run();
