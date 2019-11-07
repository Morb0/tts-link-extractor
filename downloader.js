const fetch = require('node-fetch');
const fileType = require('file-type');
const url = require('url');
const path = require('path');
const fs = require('fs');

const urls = fs.readFileSync('./urls.txt').toString().split('\n');

const getFilename = fUrl => {
  return fetch(fUrl)
    .then(async res => {
      const { ext } = fileType(await res.buffer());
      const pathname = url.parse(fUrl).pathname;
      const basename = path.basename(pathname);
      return basename.includes(ext) ? basename : `${basename}.${ext}`;
    })
    .catch(console.error);
};

const downloadFile = url => {
  fetch(url)
    .then(async res => {
      const filename = await getFilename(url);
      const dest = fs.createWriteStream(`./downloads/${filename}`);
      res.body.pipe(dest);
    });
}

for (const url of urls) {
  downloadFile(url);
}