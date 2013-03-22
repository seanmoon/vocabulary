var app = app || {};

(function() {
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
      this.filterWords();
    },
    filterWords: function filterWords() {
      var date = moment(app.DateFilter);
      if (date && app.DateFilter) {
        app.Words.each(function(word) {
          var e = word.wasAddedOnDay(date) && !word.isDeleted() ? 'visible' : 'hidden';
          word.trigger(e);
        });
      } else if (app.Filter === "deleted") {
        app.Words.each(function(word) {
          var e = word.isDeleted() ? 'visible' : 'hidden';
          word.trigger(e);
        });
      } else {
        app.Words.each(function(word) {
          var e = word.isDeleted() ? 'hidden' : 'visible';
          word.trigger(e);
        });
      }
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
      var data = this.$input.val().trim();
      if (data && e.which == 13) { // enter key
        this.$input.val('');
        data = data.split(":");
        var name = data[0].trim();
        if (data.length > 1) {
          var notes = data[1].trim();
          app.Words.create({ name: name, notes: notes });
        } else {
          app.Words.create({ name: name });
        }
      }
    },
    addButtonClicked: function addButtonClicked() {
      var name = this.$input.val().trim();
      if (name) {
        this.$input.val('');
        app.Words.create({ name: name });
        this.$addButton.addClass("disabled");
      }
    },
    wordSelected: function wordSelected(e) {
      app.Words.each(function(word) { word.trigger('deselect'); });
      var $word = $(e.target).closest(".word");
      var id = $word.data('id');
      var word = app.Words.get(id);
      word.trigger('select');
    }
  });
})();
