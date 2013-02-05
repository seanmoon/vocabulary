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
      view.setUpStudyLists();
      expect(view.$studyLists.children().length).toBe(1);
    });

    it("should create one entry for each existing word date", function() {
      var today = moment().unix();
      var yesterday = moment().subtract('days', 1).unix();
      app.Words.create({addedOn: today});
      app.Words.create({addedOn: today});
      app.Words.create({addedOn: yesterday});

      view.setUpStudyLists();

      expect(view.$studyLists.children().length).toBe(2);
    });
  });
});
