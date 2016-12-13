var book = Handlebars.templates.book;

var BookView = Backbone.View.extend({
  tagName: "li",

  className: "cf",

  template: book,

  events: {
    "mouseenter": "toggleActions",
    "mouseleave": "toggleActions",
    "click .edit-book": "editBook",
    "click .delete-book": "deleteBook",
    "click .details-book": "openDetails"
  },

  openDetails: function () {
    new BookDetailsView({ model: this.model });
  },

  editBook: function () {
    new ModalView({ model: this.model });
  },

  deleteBook: function (e) {
    var bookId = $(e.currentTarget).data("id");
    var self = this;
    $.ajax({
      url: "/books/" + bookId,
      method: "delete",
      complete: function (data, stat) {
        self.model.destroy();
        self.remove();
      }
    });
  },

  toggleActions: function () {
    var $actionButtons = this.$("input[type='button']");
    $actionButtons.fadeToggle(500);
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.attr("data-id", this.model.get("id"));

    return this;
  }
});
