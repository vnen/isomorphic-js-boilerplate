var React = require('react'),
    NavbarComponent,
    HeaderComponent;

NavbarComponent = React.createClass({
  render: function () {
    return (
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
    );
  }
});

HeaderComponent = React.createClass({
  render: function () {
    return (
      <header>
        <NavbarComponent />
      </header>
    );
  }
});

module.exports = HeaderComponent;
