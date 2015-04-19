# Isomorphic Javascript Boilerplate

This is a little boilerplate for isomporphic/progressive Javascript application.

It uses [Backbone.js](http://backbonejs.org/) for stores, [React.js](http://facebook.github.io/react/) for views and [Flux](http://facebook.github.io/flux/) for the data flow.
And also [koa](http://koajs.com) for the backend server.

Roughly based on:

* http://jsforallof.us/2015/02/23/isomorphic-web-apps-and-react-js
* http://www.toptal.com/front-end/simple-data-flow-in-react-applications-using-flux-and-backbone

## Requirements

* [io.js](https://iojs.org)
  * May work with [Node.js](http://nodejs.org) >= 0.11.16 with `--harmony-generators` flag.
* GNU make or compatible (optional, for scripts only).

## Running

```shell
make start
```

## Testing

```shell
make test
```

You can test in the browser with Zuul:

```shell
make test-browser
```

And open the url that will show up in the terminal.

## License

MIT
