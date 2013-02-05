var app = app || {};

(function() {
  'use strict';

  app.WordView = Backbone.View.extend({
    className: "word",
    template: _.template( $('#word-template').html() ),
    initialize: function initialize() {
      this.listenTo(this.model, 'visible', this.setVisible);
      this.listenTo(this.model, 'hidden', this.setHidden);
    },
    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    },
    setVisible: function setVisible() {
      this.$el.show();
    },
    setHidden: function setHidden() {
      this.$el.hide();
    }
  });
})();
