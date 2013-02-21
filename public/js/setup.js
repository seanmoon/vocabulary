var app = app || {};

(function() {
  app.Storage = new Backbone.LocalStorage('wordjournal');
  Backbone.emulateJSON = true;
})();
