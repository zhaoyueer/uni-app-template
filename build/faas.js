const { promise: exec } = require('exec-sh');
const path = require('path');
const fs = require('fs');
const stripJsonComments = require('strip-json-comments');

let manifest = fs.readFileSync(
  path.resolve(__dirname, '../src/manifest.json'),
  'utf8',
);

manifest = JSON.parse(stripJsonComments(manifest));

manifest.h5.publicPath = process.env.FAAS_OUTPUT_PUBLIC_URL;

fs.writeFileSync(
  path.resolve(__dirname, '../src/manifest.json'),
  JSON.stringify(manifest),
);

if (Number(process.env.FAAS_ENV_TYPE) === 1) {
  exec('yarn build:prod-h5').catch((e) => {
    process.exit(e.code || -1);
  });
} else {
  exec('yarn build:dev-h5').catch((e) => {
    process.exit(e.code || -1);
  });
}
