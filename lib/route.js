var React = require('react'),
    AppComponent = require('../assets/components/app.jsx');

module.exports = Route;

function Route(component, props, stores) {
  this.component = component;
  this.props = props || {};
  this.stores = stores || [];
}

Route.prototype.render= function () {
  var appComponent;

  appComponent = React.createElement(AppComponent, {
    component: this.component,
    childProps: this.props
  });

  /*istanbul ignore else*/
  if (typeof window === 'undefined') {
    return React.renderToString(appComponent);
  }
  /*istanbul ignore next*/
  return React.render(appComponent, document.getElementById('app'));
};
