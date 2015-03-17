/* jshint mocha:true, expr: true*/
var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    MainRouter = require('../assets/routers/main'),
    node = typeof window === 'undefined';

chai.use(require('sinon-chai'));

Backbone.$ = $;

function loadRoute(route) {
  if (typeof window === 'undefined') {
    Backbone.history.loadUrl(route);
  } else {
    Backbone.history.navigate(route, { trigger: true });
  }
}

function injectMainElement() {
  if (!node) {
    var main = document.createElement('main');
    main.style.display = 'none';
    document.getElementsByTagName('body')[0].appendChild(main);
  }
}

describe('Main router', function () {
  before(injectMainElement);

  describe('Route associations', function () {
    beforeEach(function () {
      this.trigger = { trigger: true };

      if (!node) {
        Backbone.history.stop();
      }

      sinon.spy(MainRouter.prototype, 'home');

      this.mainRouter = new MainRouter();

      if (!node) {
        Backbone.history.start();
      }
    });

    afterEach(function () {
      this.mainRouter.home.restore();
    });

    it('should call home if no route', function () {
      loadRoute('');
      expect(this.mainRouter.home).to.have.been.called;
    });

    it('should call home if path is "/"', function () {
      loadRoute('/');
      expect(this.mainRouter.home).to.have.been.called;
    });
  });
});
