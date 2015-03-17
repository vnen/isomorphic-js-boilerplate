/*globals BOOTSTRAP:true */
var Backbone = require('backbone'),
    Dispatcher = require('../dispatcher'),
    BaseCollection;

module.exports = BaseCollection = Backbone.Collection.extend({
  url: function () {
    return 'http://localhost:8082/api' + this.path;
  },
  path: '',
  initialize: function () {
    Dispatcher.register(this.dispatchCallback.bind(this));
  },
  comparator: function (model) {
    return model.get('id');
  },
  bootstrap: function () {
    if (typeof window !== 'undefined') {
      this.off(null, this.updateCache, this);
      this.on('reset add remove destroy sync', this.updateCache, this);
      if (typeof BOOTSTRAP !== 'undefined' && BOOTSTRAP && typeof BOOTSTRAP[this.name] !== 'undefined') {
        return this.reset(BOOTSTRAP[this.name]);
      }
      this.fetch({ reset: true });
    }
  },
  updateCache: function () {
    BOOTSTRAP = BOOTSTRAP || {};
    BOOTSTRAP[this.name] = this.toJSON();
  },
  dispatchCallback: function dummy() { }
});
