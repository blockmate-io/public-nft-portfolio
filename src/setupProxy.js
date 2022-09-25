const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://auth.blockmate.io',
    changeOrigin: true
}
const proxy2 = {
    target: 'https://auth.blockmate.io',
    changeOrigin: true,
}
const proxy3 = {
    target: 'https://aisp-api.blockmate.io',
    changeOrigin: true,
}

const proxy4 = {
    target: 'https://aisp-api.blockmate.io',
    changeOrigin: true,
}

module.exports = function(app) {
  app.use(
    '/v1/auth',
    createProxyMiddleware(proxy)
  );


  app.use(
    '/v1/users',
    createProxyMiddleware(proxy2)
  );

  app.use(
    '/v1/nft',
    createProxyMiddleware(proxy3)
  );

  app.use(
    '/v1/aggregate',
    createProxyMiddleware(proxy4)
  );

};

