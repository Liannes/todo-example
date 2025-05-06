const path = require('path');
const fs = require('fs');

const title = 'Todo';
const titleShort = 'Todo';

const appDirectory = fs.realpathSync(process.cwd());
const buildPath = process.env.BUILD_PATH || 'build';
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
// const HtmlWebpackPluginMeta = {
//   httpEquiv: {
//     httpEquiv: 'Content-Type',
//     content: 'text/html; charset=UTF-8',
//   },
//   'cache-control': 'no-cache, no-store, must-revalidate',
//   charset: {
//     charset: 'utf-8',
//   },
// };

const HtmlWebpackPluginMeta = {
  httpEquiv: 'Content-Type',
  content: 'text/html; charset=UTF-8',
  'cache-control': 'no-cache, no-store, must-revalidate',
  charset: 'utf-8',
};

const WebpackPwaManifest = {
  filename: 'manifest.json',
  // start_url: './login',
  scope: '.',
  publicPath: '/',
  dir: 'ltr', //'ltr', 'rtl', 'auto'
  orientation: 'portrait', //'any', 'natural', 'landscape', 'landscape-primary', 'landscape-secondary', 'portrait', 'portrait-primary', 'portrait-secondary', 'omit'
  display: 'standalone', //'fullscreen', 'standalone', 'minimal-ui', 'browser'
  name: title,
  short_name: titleShort,
  description: 'description',
  background_color: '#000000',
  theme_color: '#ffffff',
  crossorigin: null, // null, 'use-credentials', 'anonymous'
  // inject: true,
  // fingerprints: true,
  // ios: {
  //   'apple-mobile-web-app-title': title,
  //   'apple-mobile-web-app-status-bar-style': 'black',
  // },
  // includeDirectory: true,
  // icons: [
  //   {
  //     src: path.resolve('public/favicon.ico'),
  //     sizes: [64, 32, 24, 16], // multiple sizes
  //   },
  //   {
  //     src: path.resolve('public/icon-192.png'),
  //     size: '192x192', // you can also use the specifications pattern
  //   },
  //   {
  //     src: path.resolve('public/icon-512.png'),
  //     size: '512x512',
  //   },
  // ],
};
module.exports.HtmlWebpackPluginMeta = HtmlWebpackPluginMeta;
module.exports.WebpackPwaManifest = WebpackPwaManifest;
module.exports.title = title;

// config after eject: we're in ./config/
module.exports = {
  src: resolveApp('src'),
  public: resolveApp('public'),
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  // appBuild: resolveApp(buildPath),
  // appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  // appIndexJs: resolveModule(resolveApp, 'src/index'),
  // appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  // appTsConfig: resolveApp('tsconfig.json'),
  // appJsConfig: resolveApp('jsconfig.json'),
  // yarnLockFile: resolveApp('yarn.lock'),
  // testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  // proxySetup: resolveApp('src/setupProxy.js'),
  // appNodeModules: resolveApp('node_modules'),
  // swSrc: resolveModule(resolveApp, 'src/service-worker'),
};
