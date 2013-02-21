describe("App", function() {
  describe("passwordHash", function() {
    it("should return the SHA256 of the password", function() {
      var hash = app.passwordHash("password");
      expect(hash).toBe("5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8");
    });
  });

  describe("login", function() {
    it("should store the login information and try to login", function() {
      var fake = {}; fake.done = function() {}; fake.fail = function() {};
      var fakeAjax = function() { return fake; }
      spyOn($, 'ajax').andCallFake(fakeAjax);
      var username = "sean";
      var password = "password";

      app.login(username, password);

      var storedUsername = localStorage.getItem('username');
      var storedPassword = localStorage.getItem('passwordHash');
      expect($.ajax).toHaveBeenCalled();
      expect(storedUsername).toBe("sean");
      expect(storedPassword).toBe(app.passwordHash(password));
    });
  });

  describe("loginFail", function() {
    beforeEach(function() {
      window.loginOverlayView = {};
      loginOverlayView.failure = function () {};
    });

    afterEach(function() {
      window.loginOverlayView = null;
    });

    it("should clear the login information from localStorage", function() {
      localStorage.setItem("username", "sean");
      localStorage.setItem("passwordHash", "password");

      app.loginFail();

      var storedUsername = localStorage.getItem('username');
      var storedPassword = localStorage.getItem('passwordHash');
      expect(storedUsername).toBe(null);
      expect(storedPassword).toBe(null);
    });

    it("should reset the login overlay", function() {
      spyOn(loginOverlayView, 'failure');
      app.loginFail();
      expect(loginOverlayView.failure).toHaveBeenCalled();
    });
  });

  describe("loginDone", function() {
    it("should update the URL of the words collection and fetch data", function() {});
    it("should hide the login overlay", function() {});
  });
});
