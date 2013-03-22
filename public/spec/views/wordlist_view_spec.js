describe("WordlistView", function() {
  var view;

  beforeEach(function() {
    var $template = $('#wordlist-template').html();
    $("#fixture").append($template);
    view = new app.WordlistView();
  });

  afterEach(function() {
    $('#fixture').empty();
  });

  it("should have an input", function() {
    expect(view.$input).toBeDefined();
  });

  it("should have an add button", function() {
    expect(view.$addButton).toBeDefined();
  });

  it("should have a word list", function() {
    expect(view.$words).toBeDefined();
  });

  describe("dom event handling", function () {
    describe("keyup", function() {
      describe("with no input", function() {
        it("should disable the add button", function() {
          view.$addButton.removeClass("disabled");
          view.$input.val('');

          view.keypressed();

          var hasClass = view.$addButton.hasClass("disabled");
          expect(hasClass).toBe(true);
        });
      });

      describe("with input", function() {
        it("should enable the add button", function() {
          view.$addButton.addClass("disabled");
          view.$input.val('x');

          view.keypressed();

          var hasClass = view.$addButton.hasClass("disabled");
          expect(hasClass).toBe(false);
        });
      });
    });

    describe("keypressed", function() {
      describe("when enter is pressed", function() {
        var e;

        beforeEach(function() {
          e = {};
          e.which = 13; // enter key
          app.Words = new app.WordCollection();
          app.Words.fetch = function() {};
        });

        it("should create a word when there is input and separate the notes", function() {
          expect(app.Words.models.length).toBe(0);
          view.$input.val('ok!: these are notes');

          view.createOnEnter(e);

          expect(app.Words.models.length).toBe(1);
          var word = app.Words.models[0];
          expect(word.get("name")).toEqual('ok!');
          expect(word.get("notes")).toEqual('these are notes');
        });

        it("should not create a word when there is no input", function() {
          expect(app.Words.models.length).toBe(0);
          view.$input.val('');

          view.createOnEnter(e);

          expect(app.Words.models.length).toBe(0);
        });

        it("should clear the input", function() {
          view.$input.val('ok!');
          view.createOnEnter(e);
          expect(view.$input.val()).toBe('');
        });
      });
    });
  });

  describe("word collection callbacks", function() {
    describe("reset", function() {
      it("should add the word to the list view", function() {
        var length = view.$words.children().length;

        app.Words.create();

        var newLength = view.$words.children().length;
        expect(newLength).toEqual(length + 1);
      });

      it("should add existing words to list on startup");
    });

    describe("filter", function() {
      beforeEach(function() {
        app.DateFilter = null;
        app.Filter = null;
      });

      describe("when there's no filter", function() {
        it("should show all non-deleted words", function() {
          app.Words.create();
          app.Words.create({"deleted": "true"});
          var word = app.Words.create();
          var deletedWord = app.Words.create({"deleted": "true"});
          spyOn(word, 'trigger');
          spyOn(deletedWord, 'trigger');

          view.filterWords();

          expect(word.trigger.mostRecentCall.args[0]).toEqual("visible");
          expect(deletedWord.trigger.mostRecentCall.args[0]).toEqual("hidden");
        });
      });

      describe("with a DateFilter set", function() {
        it("should only show non-deleted words from the given date", function() {
          app.DateFilter = "2013-01-26";
          var unixTime = 1359126000; // 2013-01-26 unix time
          var otherWord = app.Words.create({"addedOn": unixTime});
          var deletedWord = app.Words.create({"addedOn": unixTime, "deleted": "true"});
          var todayWord = app.Words.create();

          spyOn(otherWord, 'trigger');
          spyOn(deletedWord, 'trigger');
          spyOn(todayWord, 'trigger');

          view.filterWords();

          expect(otherWord.trigger.mostRecentCall.args[0]).toEqual("visible");
          expect(deletedWord.trigger.mostRecentCall.args[0]).toEqual("hidden");
          expect(todayWord.trigger.mostRecentCall.args[0]).toEqual("hidden");

          app.DateFilter = null;
        });
      });

      describe("with a 'deleted' Filter set", function() {
        it("should only show deleted words", function() {
          app.Filter = "deleted";
          var deletedWord = app.Words.create({"deleted": "true"});
          var otherWord = app.Words.create();
          spyOn(deletedWord, 'trigger');
          spyOn(otherWord, 'trigger');

          view.filterWords();

          expect(deletedWord.trigger.mostRecentCall.args[0]).toEqual("visible");
          expect(otherWord.trigger.mostRecentCall.args[0]).toEqual("hidden");

          app.Filter = null;
        });
      });
    });
  });
});
