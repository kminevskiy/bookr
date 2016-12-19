var menu = Handlebars.templates.menu;

var MenuView = Backbone.View.extend({
  tagName: "ul",

  template: menu,

  render: function (page) {
    this.$el.html(this.template(page));
    $("nav").html(this.$el);
  }
});
