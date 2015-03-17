#!/usr/bin/env node
var app = require('./app');
app.port = process.env.APP_PORT || 8080;
app.address = process.env.APP_ADDRESS || '0.0.0.0';

app.listen(app.port, app.address, function () {
  console.log('On %s environment. Listening to %s:%s.', app.env, app.address, app.port);
});
