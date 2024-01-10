const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ec2-15-188-52-96.eu-west-3.compute.amazonaws.com',
      changeOrigin: true,
    //   pathRewrite: {
    //     '^/api': '/api', // Retirez le préfixe "/api" de la requête, car le serveur distant ne s'attend probablement pas à ce préfixe
    //   },
    })
  );
};
