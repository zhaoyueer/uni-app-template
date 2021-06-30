import P from './prod';

let config: typeof P;

if (process.env.VUE_APP_ENV === 'prod') {
  config = require('./prod.ts').default;
} else {
  config = require('./dev.ts').default;
}

export default config;
