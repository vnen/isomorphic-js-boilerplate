var mounted = require('koa')(),
    mount = require('koa-mount'),
    routes = [
      require('./api') // See api/index.js for example of route
    ];

routes.forEach(function (route) {
  mounted.use(mount(route.base, route.app));
});

module.exports = mounted;
