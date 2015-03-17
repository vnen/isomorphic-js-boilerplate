var React = require('react'),
    HeaderComponent = require('./header.jsx'),
    AppComponent;

AppComponent = React.createClass({
  render: function () {
    return (
      <div>
        <HeaderComponent />
        {this.props.component && <this.props.component {...this.props.childProps} />}
      </div>
    );
  }
});

module.exports = AppComponent;
