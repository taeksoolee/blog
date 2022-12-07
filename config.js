const realUrl = 'https://taeksoolee.github.io';
const isProd = location.origin === realUrl;
if(isProd) {
  window.urlContext = '/blog';
}
