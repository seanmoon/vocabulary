var app = app || {};

(function() {
  var options = {
    model: app.Word,
    comparator: function comparator(word) { return word.get('addedOn'); },
    create: function create(word, options) {
      options = options || {};
      $.extend(options, {
        wait: true,
      });
      return Backbone.Collection.prototype.create.call(this, word, options);
    }
  };

  var username = localStorage.getItem("username");
  if (username) {
    var url = '/users/' + username + '/words';
    $.extend(options, { url: url })
  } else {
    $.extend(options, { localStorage: app.Storage })
  }

  app.WordCollection = Backbone.Collection.extend(options);
  app.Words = new app.WordCollection();
}());
