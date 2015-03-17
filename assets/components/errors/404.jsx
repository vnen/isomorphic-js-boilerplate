var React = require('react'),
    Error404Component;

Error404Component = React.createClass({
  render: function () {
    return (
      <main>
        <h1>Page not found</h1>
      </main>
    );
  }
});

module.exports = Error404Component;
