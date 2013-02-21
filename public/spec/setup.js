var app = app || {};

(function() {
  app.Storage = new Backbone.LocalStorage('wordjournal-test');
  app.SpecMode = true;
})();
