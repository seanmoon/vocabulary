describe("WordCollection", function() {
  var words;

  beforeEach(function() {
    words = new app.WordCollection();
  });

  it("should exist", function() {
    expect(words instanceof app.WordCollection).toBe(true);
  });
});
