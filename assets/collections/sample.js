var BaseCollection = require('./base'),
    SampleConstants = require('../constants/sample'),
    SampleCollection;

module.exports = SampleCollection = BaseCollection.extend({
  name: 'sample',
  path: '/sample',
  dispatchCallback: function (payload) {
    switch (payload.actionType) {
      case SampleConstants.log: {
        console.log(payload.line);
        this.trigger('logged', payload.line);
        break;
      }
    }
  }
});
