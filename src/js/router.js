var app = app || {};

(function() {
  'use strict';

  app.WordJournalRouter = Backbone.Router.extend({
    routes:{
      'date/:date': 'setDate',
      'all': 'showAll',
      '*path': 'showAll'
    },
    setDate: function(param) {
      app.DateFilter = param.trim() || '';
      app.Words.trigger('filter');
    },
    showAll: function() {
      app.DateFilter = null;
      app.Words.trigger('filter');
    }
  });

  app.wordJournalRouter = new app.WordJournalRouter();
  Backbone.history.start();
}());
