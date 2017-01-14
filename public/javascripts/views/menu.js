var menu = Handlebars.templates.menu;

var MenuView = Backbone.View.extend({
  tagName: "ul",

  template: menu,

  initialize: function () {
    this.on("navChange", this.navChange);
  },

  navChange: function (activeItemIndex) {
    this.menuItemIndex = activeItemIndex;
  },

  render: function (page) {
    this.$el.html(this.template(page));
    $("nav").html(this.el);
    $("nav a").eq(this.menuItemIndex).addClass("active-nav-button");
  }
});
