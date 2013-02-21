describe("WordView", function() {
  var view;

  beforeEach(function() {
    var $template = $('#word-template').html();
    $("#fixture").append($template);

    var word = new app.Word();
    view = new app.WordView({ model: word });
  });

  afterEach(function() {
    $('#fixture').empty();
  });

  it("should have the class set", function() {
    var $el = $(view.render().el);
    expect($el.hasClass("word")).toBe(true);
  });
});

