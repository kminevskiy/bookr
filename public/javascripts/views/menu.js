var menu = Handlebars.templates.menu;

var DefaultMenuView = Backbone.View.extend({
  tagName: "ul",

  template: menu,

  render: function () {
    this.$el.html(this.template());
    $("nav").html(this.$el);
  },

  initialize: function () {
    this.render();
  }
});
