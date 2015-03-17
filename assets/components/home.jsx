var React = require('react'),
    SampleComponent = require('./sample.jsx'),
    HomeComponent;

HomeComponent = React.createClass({
  render: function () {
    return (
      <main>
        <h1>Your single page isomorphic application</h1>
        <SampleComponent />
      </main>
    );
  }
});

module.exports = HomeComponent;
