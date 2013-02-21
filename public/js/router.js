var app = app || {};

(function() {
  app.WordJournalRouter = Backbone.Router.extend({
    routes:{
      'date/:date': 'setDate',
      'deleted': 'showDeleted',
      'all': 'showAll',
      'logout': 'logout',
      '*path': 'showAll'
    },
    setDate: function(param) {
      app.DateFilter = param.trim() || '';
      app.Filter = null;
      app.Words.trigger('filter');
    },
    showAll: function() {
      app.DateFilter = null;
      app.Filter = null;

      app.Words.trigger('filter');
    },
    showDeleted: function() {
      app.DateFilter = null;
      app.Filter = 'deleted';

      app.Words.trigger('filter');
    },
    logout: function() {
      localStorage.clear();
    }
  });

  app.wordJournalRouter = new app.WordJournalRouter();
  Backbone.history.start();
}());
