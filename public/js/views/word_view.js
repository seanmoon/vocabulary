var app = app || {};

(function() {
  app.WordView = Backbone.View.extend({
    className: "word",
    template: _.template( $('#word-template').html() ),
    events: {
      'click i.icon-remove.enabled': 'deleteWord',
    },
    initialize: function initialize() {
      this.listenTo(this.model, 'visible', this.setVisible);
      this.listenTo(this.model, 'hidden', this.setHidden);
      this.listenTo(this.model, 'select', this.setSelected);
      this.listenTo(this.model, 'deselect', this.setDeselected);
    },
    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      this.$el.data({'id': this.model.get('id')});
      if (this.model.isDeleted()) {
        this.$el.addClass(this.$el.addClass("deleted"));
      }
      return this;
    },
    setVisible: function setVisible() {
      this.$el.show();
    },
    setHidden: function setHidden() {
      this.$el.hide();
    },
    setDeselected: function setDeselected() {
      this.$el.removeClass("selected");
      var $icon = this.$el.find('i');
      $icon.addClass("icon-pencil");
      $icon.removeClass("icon-remove");
      $icon.removeClass("enabled");
    },
    setSelected: function setSelected() {
      this.$el.addClass("selected");
      var $icon = this.$el.find('i');
      $icon.removeClass("icon-pencil");
      $icon.addClass("icon-remove");
      $icon.addClass("enabled");
    },
    deleteWord: function deleteWord() {
      if (this.$el.hasClass("deleted")) {
        this.$el.removeClass("deleted");
        this.model.setUndeleted();
      } else {
        this.$el.addClass("deleted");
        this.model.setDeleted();
      }
      this.setDeselected();
      return false;
    }
  });
})();
