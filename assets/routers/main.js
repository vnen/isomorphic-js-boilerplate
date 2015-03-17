var Backbone = require('backbone'),
    Route = require('../../lib/route'),
    HomeComponent = require('../components/home.jsx'),
    ErrorComponents = require('../components/errors');

module.exports = Backbone.Router.extend({
  initialize: function () {
    this.makeRoute('*notfound', 'notFound');
    this.makeRoute('', 'home');
    this.makeRoute('/', 'home');
  },
  makeRoute: function (path, name) {
    var handler = this[name]();
    if (typeof window === 'undefined') {
      return this.route(path, name, function dummy() {} );
    }
    this.route(path, name, handler.render.bind(handler));
  },
  home: function () {
    return new Route(HomeComponent);
  },
  notFound: function () {
    var route = new Route(ErrorComponents.Error404Component);
    route.status = 404;
    return route;
  }
});
