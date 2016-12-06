var menu = Handlebars.templates.menu;

var MenuView = Backbone.View.extend({
  tagName: "ul",

  template: menu,

  render: function () {
    this.$el.html(this.template());
    $("nav").append(this.$el);
  },

  initialize: function () {
    this.render();
  }
});
