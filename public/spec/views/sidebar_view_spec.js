describe("SidebarView", function() {
  var view;

  beforeEach(function() {
    localStorage.clear();
    var $template = $('#sidebar-template').html();
    $("#fixture").append($template);
    view = new app.SidebarView();
  });

  afterEach(function() {
    $('#fixture').empty();
  });

  it("should be", function() {
    expect(view).toBeDefined();
  });

  describe("clicking reset", function() {
    it("should reset localStorage", function() {
      localStorage.setItem("foo", "bar");

      view.$resetButton.click();

      expect(localStorage.getItem("foo")).toBe(null);
    });
  });

  describe("setting up sidebar study lists", function() {
    it("should always create an entry for today", function() {
      var today = moment().format("YYYY-MM-DD");

      view.setUpStudyLists();

      var text = view.$studyLists.children().eq(1).text().trim();
      expect(text).toEqual(today);
    });

    it("should always have an all words list", function() {});
    it("should always have a deleted list", function() {});
    it("should create one entry for each existing word date", function() {});
  });
});
