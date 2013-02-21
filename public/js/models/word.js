var app = app || {};

(function() {
  app.Word = Backbone.Model.extend({
    defaults: {
      name: '',
      addedOn: moment().unix()
    },
    isDeleted: function isDeleted() {
      return this.get('deleted') === "true";
    },
    wasAddedOnDay: function wasAddedOnDay(date) {
      var thisWordDate = moment.unix((this.get('addedOn'))).startOf('day');
      return (date.unix() == thisWordDate.unix());
    },
    date: function date() {
      return moment.unix(this.get('addedOn')).startOf('day').format("YYYY-MM-DD");
    },
    setDeleted: function setDeleted() {
      this.set('deleted', 'true');
      this.save();
    },
    setUndeleted: function setUndeleted() {
      this.set('deleted', '');
      this.save();
    }
  });
}());
