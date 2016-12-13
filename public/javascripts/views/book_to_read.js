var bookToRead = Handlebars.templates.book_to_read;

var BookToReadView = Backbone.View.extend({
  tagName: "li",

  template: bookToRead,

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.attr("id", this.model.get("id"));

    return this;
  },

  events: {
    "mouseenter": "showActions",
    "mouseleave": "showActions",
    "click input[type=button]": "deleteBookToRead"
  },

  deleteBookToRead: function () {
    var id = this.el.id;

    $.ajax({
      url: "/books_to_read",
      method: "delete",
      data: {id: id}
    });

    this.remove();
  },

  showActions: function () {
    this.$("input[type=button]").fadeToggle(300);
  }
});
