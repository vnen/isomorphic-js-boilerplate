var React = require('react'),
    SampleActions = require('../actions/sample'),
    SampleStore = require('../stores/sample'),
    SampleComponent;
    
SampleComponent = React.createClass({
  getInitialState: function () {
    return { logs: 0 };
  },
  componentWillMount: function () {
    console.log('This runs both on the server and on the browser');
  },
  componentDidMount: function () {
    console.log('This runs only on the browser');
    SampleStore.on('logged', function () {
      this.setState({logs: this.state.logs + 1});
    }, this);
  },
  componentWillUnmount: function () {
    SampleStore.off(null, null, this);
  },
  handleClick: function () {
    SampleActions.log('Hello world!');
  },
  render: function () {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>Click me!</button>
        <p>You clicked {this.state.logs} times!</p>
      </div>
    );
  }
});

module.exports = SampleComponent;