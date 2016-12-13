var readMenu = Handlebars.templates.read_menu;

var ToReadMenuView = Backbone.View.extend({
  tagName: "ul",

  template: readMenu,

  render: function () {
    this.$el.html(this.template());
    $("nav").html(this.$el);
  },

  initialize: function () {
    this.render();
  }
});
