var app = app || {};

(function() {
  'use strict';

  app.SidebarView = Backbone.View.extend({
    el: "#sidebar",
    initialize: function initialize() {
      this.$resetButton = this.$("#reset_button");
      this.$studyLists = this.$("#study_lists");

      this.listenTo(app.Words, 'reset', this.setUpStudyLists);
    },
    events: {
      'click #reset_button': 'resetApp',
      'click a': 'studyListSelected'
    },
    render: function render() {},
    resetApp: function() {
      localStorage.clear();
      app.Words.fetch()
    },
    studyListSelected: function studyListSelected(e) {
      var $li = $(e.target).closest("li");
      this.$studyLists.find("li").removeClass("selected");
      $li.addClass("selected");
    },
    setUpStudyLists: function setUpStudyLists() {
      var self = this;
      var $sidebarItems = $("<div/>");
      var words = app.Words.models;
      var todayWord = new app.Word;
      words.push(todayWord);
      app.Words.each(function(word) {
        var date = word.date();
        var selector = "li[data-date='" + date + "']";
        var matches = $sidebarItems.find(selector);
        var found = matches.length > 0 ? true : false;
        if (!found) {
          var $list = $("<li></li>");
          var template =  _.template($('#sidebar-item-template').html());
          var sidebarItem = template({date: date});
          $sidebarItems.prepend(sidebarItem);
        }
      });
      this.$studyLists.append($sidebarItems.children());
    }
  });
})();
