var app = app || {};

(function() {
  'use strict'

  app.WordCollection = Backbone.Collection.extend({
    model: app.Word,
    localStorage: app.Storage,
    comparator: function comparator(word) { return word.get('addedOn'); }
  });

  app.Words = new app.WordCollection();
}());
