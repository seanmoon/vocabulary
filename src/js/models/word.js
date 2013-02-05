var app = app || {};

(function() {
  'use strict'

  app.Word = Backbone.Model.extend({
    defaults: {
      name: '',
      addedOn: moment().unix()
    },
    wasAddedOnDay: function wasAddedOnDay(date) {
      var thisWordDate = moment.unix((this.get('addedOn'))).startOf('day');
      return (date.unix() == thisWordDate.unix());
    },
    date: function date() {
      return moment.unix(this.get('addedOn')).startOf('day').format("YYYY-MM-DD");
    }
  });
}());
