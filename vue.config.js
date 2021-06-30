const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'chimee-mobile-player': path.resolve(
          __dirname,
          'src/npm-lib/chimee-mobile-player/index.js',
        ),
      },
    },
    plugins:
      process.env.UNI_PLATFORM === 'h5'
        ? [
            new CopyWebpackPlugin([
              {
                from: path.join(__dirname, 'resource'),
                to: path.join(
                  __dirname,
                  'dist',
                  process.env.NODE_ENV === 'production' ? 'build' : 'dev',
                  process.env.UNI_PLATFORM,
                ),
              },
            ]),
          ]
        : [],
  },
  chainWebpack: () => {},
};
