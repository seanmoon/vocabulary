var app = app || {};

(function() {
  'use strict';

  app.WordlistView = Backbone.View.extend({
    el: "#wordlist",
    events: {
      'keyup #new_word': 'keypressed',
      'keypress #new_word': 'createOnEnter',
      'click button': 'addButtonClicked',
      'click .word': 'wordSelected'
    },
    initialize: function initialize() {
      this.$input = this.$('#new_word');
      this.$addButton = this.$('#add_new_word_button');
      this.$words = this.$('#words');

      this.listenTo(app.Words, 'add', this.addWord);
      this.listenTo(app.Words, 'reset', this.addWords);
      this.listenTo(app.Words, 'filter', this.filterWords);
    },
    render: function render() {},

    // Word collection events
    addWord: function addWord(word) {
      var wordView = new app.WordView({ model: word });
      this.$words.prepend( wordView.render().el );
    },
    addWords: function addWords() {
      app.Words.each(this.addWord, this);
    },
    filterWords: function filterWords() {
      var date = moment(app.DateFilter);
      if (!date) {
        app.Words.each(function(word) { word.trigger('visible'); });
        return;
      }
      app.Words.each(function(word) {
        var e = word.wasAddedOnDay(date) ? 'visible' : 'hidden';
        word.trigger(e);
      });
    },

    // DOM events
    keypressed: function keypressed(e) {
      var wordName = this.$input.val().trim();
      if (wordName) {
        this.$addButton.removeClass("disabled");
      } else {
        this.$addButton.addClass("disabled");
      }
    },
    createOnEnter: function createOnEnter(e) {
      var name = this.$input.val();
      if (name && e.which == 13) { // enter key
        this.$input.val('');
        app.Words.create({ name: name });
      }
    },
    addButtonClicked: function addButtonClicked() {
      var name = this.$input.val();
      this.$input.val('');
      app.Words.create({ name: name });
      this.$addButton.addClass("disabled");
    },
    wordSelected: function wordSelected(e) {
      var $word = $(e.target).closest(".word");
      this.$words.children().removeClass("selected");
      $word.addClass("selected");
    }
  });
})();
