const PROXY_CONFIG = [
  {
    context: ['/api'],
    // target: 'http://localhost:80/backend/',
     target:'http://projetouni9t43.tecnologia.ws/apis/',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {'^/api': ''}
  }
];

module.exports = PROXY_CONFIG;