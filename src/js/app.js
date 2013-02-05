var app = app || {};
var ENTER_KEY = 13;

$(function() {
  app.login = function(username, password) {
    var shaObj = new jsSHA(password, "TEXT");
    var hash = shaObj.getHash("SHA-1", "HEX");
    console.log(hash);
    $.ajax({
      type: "POST",
      url: "api/auth/login.json",
      data: { username: username, password: hash }
    }).done(function(response) {
      console.log("done");
      console.log(response);
    }).fail(function(response) {
      console.log("fail");
      console.log(response);
      setTimeout(function() {
        loginOverlayView.success();
      }, 2000);
    });
  };
});
