var Dispatcher = require('../dispatcher'),
    SampleConstants = require('../constants/sample'),
    SampleActions;

SampleActions = {
  log: function (line) {
    Dispatcher.dispatch({
      actionType: SampleConstants.log,
      line: line
    });
  }
};

module.exports = SampleActions;
