const fs = require('fs');
const isUrl = require('is-url');

const data = JSON.parse(fs.readFileSync('./save.json'));
const urls = [];

const checkUrl = val => isUrl(val) && urls.push(val);

const scanJSON = val => {
  if (val instanceof Object) {
    for (const k in val) {
      scanJSON(val[k]);
    }
    return;
  }

  if (typeof val === 'string') {
    checkUrl(val);
  }
};

scanJSON(data);

const uniqUrls = [...new Set(urls)];
fs.writeFileSync('urls.txt', uniqUrls.join('\n'));