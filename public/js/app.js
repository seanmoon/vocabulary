var app = app || {};
var ENTER_KEY = 13;

$(function() {
  app.passwordHash = function passwordHash(password) {
    var shaObj = new jsSHA(password, "TEXT");
    return shaObj.getHash("SHA-256", "HEX");
  };

  app.loginDone = function loginDone() {
    // TODO: move to collection
    var url = '/users/' + localStorage.getItem("username") + '/words';
    app.Words.url = url;
    app.Words.localStorage = null;
    // end todo

    app.Words.fetch();
    loginOverlayView.success();
  };

  app.loginFail = function loginFail() {
    localStorage.removeItem("username");
    localStorage.removeItem("passwordHash");
    loginOverlayView.failure();
  };

  app.login = function login(username, password, hashed) {
    if (!hashed) {
      password = app.passwordHash(password);
    }
    localStorage.setItem("username", username)
    localStorage.setItem("passwordHash", password)
    var ajax = $.ajax({
      type: "POST",
      url: "/auth/login",
      data: { username: username, password_hash: password }
    });
    ajax.done(app.loginDone);
    ajax.fail(app.loginFail);
  };

  app.onLoad = function onLoad() {
    app.DateFilter = null;
    app.Filter = null;
    window.wordListView = new app.WordlistView();
    window.sidebarView = new app.SidebarView();
    var username = localStorage.getItem('username')
    var password = localStorage.getItem('passwordHash')
    window.loginOverlayView = new app.LoginOverlayView();
    if (username && password) { app.login(username, password, true); }
    app.wordJournalRouter.navigate('/');
  }
});
