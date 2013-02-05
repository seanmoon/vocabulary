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
        });

        it("should create a word when there is input", function() {
          expect(app.Words.models.length).toBe(0);
          view.$input.val('ok!');

          view.createOnEnter(e);

          expect(app.Words.models.length).toBe(1);
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
      describe("when there's no DateFilter", function() {
        it("should show all views", function() {
          app.DateFilter = null;
          app.Words.create();
          var wordView = view.$words.children().first();
          wordView.hide();

          view.filterWords();

          expect(wordView.attr("style")).toEqual("display: block;");
        });
      });

      describe("with a DateFilter set", function() {
        it("should only views from the given date", function() {
          app.DateFilter = "2013-01-26";
          var unixTime = 1359126000; // 2013-01-26 unix time
          app.Words.create({"addedOn": unixTime});
          app.Words.create();
          var otherWordView = view.$words.children().first();
          var todayWordView = view.$words.children().eq(1);
          otherWordView.show();
          todayWordView.hide();

          view.filterWords();

          expect(todayWordView.attr("style")).toEqual("display: block;");
          expect(otherWordView.attr("style")).toEqual("display: none;");
        });
      });
    });
  });
});
