var api = require('koa')(),
    router = require('koa-router')(),
    statusApi = require('./status');

router.get('/', statusApi.getAll);

api.use(router.routes());
api.use(router.allowedMethods());

api.use(function *notFound(){
  this.status = 404;
  this.body = {
    error: 'Page not found'
  };
});

module.exports = {
  base: '/api',
  app: api
};
