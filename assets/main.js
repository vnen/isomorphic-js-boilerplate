var Backbone = require('backbone'),
  $ = require('jquery'),
  MainRouter = require('./routers/main'),
  mainRouter = new MainRouter();

require('jquery.cookie');

Backbone.$ = $;

$(function () {

  Backbone.history.start({
    pushState: true
  });

  $(document).on('click', 'a[href]', function (event){
    event.preventDefault();
    var url = event.currentTarget.pathname.slice(1);
    mainRouter.navigate(url, true);
  });

  $(document).ajaxSend(function (event, jqXHR) {
    var jwt = $.cookie('jwt');
    if (jwt) {
      jqXHR.setRequestHeader('Authorization', 'Bearer ' + jwt);
    }
  });

});
