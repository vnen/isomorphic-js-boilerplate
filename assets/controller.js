var Backbone = require('backbone'),
    _ = require('underscore'),
    MainRouter = require('./routers/main'),
    fs = require('fs'),
    path = require('path'),
    najax = require('../lib/najax');

Backbone.ajax = function (options) {
  najax(options);
};

module.exports = {
  init: function (context) {
    return function (callback) {
      var mainRouter = new MainRouter();
      mainRouter.on('route', function (routeName) {
        fs.readFile(path.join(process.cwd(), 'assets/index.html'), 'utf8', function (err, template) {
          if (err) { return callback(err); }
          var route = mainRouter[routeName]();
          this.bootstrap(route, function (err, data) {
            if (err) { return callback(err); }
            var rendered = this.render(template, data, route.render());
            if (route.status) {
              context.status = route.status;
            }
            callback(null, rendered);
          }.bind(this));
        }.bind(this));
      }.bind(this));
      Backbone.history.loadUrl(context.req.url);
    }.bind(this);
  },

  bootstrap: function (route, callback) {
    var data = {};
    if (!route.stores || _.size(route.stores) === 0) {
      callback(null, data);
    }
    var err = null, after = _.after(_.size(route.collections), function () {
      callback(err, data);
    });
    _.each(route.stores, function (name) {
      var collection = require('./stores/' + name);
      collection.fetch({
        success: function () {
          var name = collection.name;
          data[name] = collection.toJSON();
          after();
        },
        error: function (xhr, error, e) {
          err = e;
          after();
        }
      });
    });
  },

  render: function (template, data, markup) {
    var rendered = template.replace('---Markup---', markup);
    return rendered.replace('---BOOTSTRAP---', JSON.stringify(data));
  }
};
