describe("Word", function() {
  var word;

  beforeEach(function() {
    word = new app.Word();
  });

  it("should have a name", function() {
    expect(word.get('name')).toEqual('');
  });

  it("should have an addenOn date", function() {
    var startOfToday = moment().startOf('day').unix();
    var wordDate = moment.unix(word.get('addedOn'));
    var startOfWordDay = wordDate.startOf('day').unix();
    expect(startOfWordDay).toEqual(startOfToday);
  });

  describe("wasAddedOnDay", function() {
    describe("when the date is the same day the word was created", function() {
      it("should be true", function() {
        var date = moment().startOf('day');
        var result = word.wasAddedOnDay(date);
        expect(result).toBe(true);
      });
    });

    describe("when the date is not the same day the word was created", function() {
      it("should be false", function() {
        var date = moment().subtract('days', 1).startOf('day');
        var result = word.wasAddedOnDay(date);
        expect(result).toBe(false);
      });
    });
  });

  describe("date", function() {
    it("should return the addedOn date in YYYY-MM-DD format", function() {
      var today = moment();
      word.set('addedOn', today.unix());
      var todayWithFormat = today.startOf('day').format("YYYY-MM-DD");

      expect(word.date()).toEqual(todayWithFormat);
    });
  });
});
