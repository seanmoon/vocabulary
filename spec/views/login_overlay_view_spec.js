describe("LoginOverlayView", function() {
  var view;

  beforeEach(function() {
    localStorage.clear();
    var $template = $('#login-overlay-template').html();
    $("#fixture").append($template);
    view = new app.LoginOverlayView();
  });

  afterEach(function() {
    $('#fixture').empty();
  });

  it("should be", function() {
    expect(view).toBeDefined();
  });

  describe("signIn", function() {
    it("should call login with the username and password", function() {
      spyOn(app, "login");
      view.$username.val("sean");
      view.$password.val("password");

      view.signIn();

      var args = app.login.mostRecentCall.args;
      expect(args[0]).toBe("sean");
      expect(args[1]).toBe("password");
    });
  });
});
