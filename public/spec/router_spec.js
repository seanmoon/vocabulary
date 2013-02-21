describe("WordJournalRouter", function() {
  var router;

  beforeEach(function() {
    router = new app.WordJournalRouter();
  });

  describe("setDate", function() {
    it("should set the DateFilter", function() {
      app.DateFilter = '';

      router.setDate('2013-01-26');

      expect(app.DateFilter).toBe('2013-01-26');
      expect(app.Filter).toBe(null);
    });
  });

  describe("showAll", function() {
    it("should clear the filters", function() {
      app.DateFilter = 'something';

      router.showAll();

      expect(app.DateFilter).toBe(null);
      expect(app.Filter).toBe(null);
    });
  });

  describe("showDeleted", function() {
    it("should clear the DateFilter and set the Filter", function() {
      app.DateFilter = 'something';
      app.Filter = null;

      router.showDeleted();

      expect(app.DateFilter).toBe(null);
      expect(app.Filter).toBe('deleted');
    });
  });
});
