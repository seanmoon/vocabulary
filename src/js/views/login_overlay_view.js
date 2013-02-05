var app = app || {};

(function() {
  'use strict';

  app.LoginOverlayView = Backbone.View.extend({
    el: "#login_overlay",
    initialize: function initialize() {
      this.$username  = this.$('#login_input');
      this.$password  = this.$('#password');
      this.$indicator = this.$('.sign-in-indicator');
      this.$indicatorIcon = this.$('.sign-in-indicator > i');

      var options = { lines: 8, length: 2, width: 2, radius: 4, color: '#ccc' };
      this.$indicatorIcon.spin(options);

      this.$spinner = this.$indicatorIcon.find(".spinner");
      this.$spinner.hide();
    },
    render: function render() {},
    events: {
      'click .sign-in-indicator': 'signIn',
      'keypress #password': 'signInOnEnter'
    },
    signInOnEnter: function signInOnEnter(e) {
      if (e.which == ENTER_KEY)  {
        this.signIn();
      }
    },
    signIn: function signIn() {
      var username = this.$username.val().trim();
      var password = this.$password.val().trim();
      this.$indicator.addClass("loading");
      this.$spinner.show();
      app.login(username, password);
    },
    success: function success() {
      this.$indicator.removeClass("loading");
      this.$indicator.empty();
      var okay = $("<i></i>").addClass("icon-ok");
      this.$indicator.append(okay);
      this.$el.fadeOut('slow');
    }
  });
})();
