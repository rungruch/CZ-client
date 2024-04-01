const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api', '/auth', '/img'],
    createProxyMiddleware({
      target: 'https://cz-server-rungruch.azurewebsites.net',
      changeOrigin: true,
    })
  );
};