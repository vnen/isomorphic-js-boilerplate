require('jsx-require-extension');

var app = require('koa')(),
    path = require('path'),
    mount = require('koa-mount'),
    bodyParser = require('koa-better-body'),
    static = require('koa-static-cache'),
    logger = require('koa-logger'),
    controller = require('./assets/controller'),
    server = require('./server');

app.use(logger());

app.use(bodyParser({
  extendTypes: {
    json: ['application/hal+json']
  },
  multipart: false
}));

app.use(static(path.join(__dirname, 'public'), {
  gzip: true,
  buffer: false
}));

app.use(mount(server));

app.use(function *() {
  this.body = yield controller.init(this);
});

module.exports = app;
