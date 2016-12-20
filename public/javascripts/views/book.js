var book = Handlebars.templates.book;

var BookView = Backbone.View.extend({
  tagName: "li",

  className: "cf",

  template: book,

  events: {
    "click .delete-book": "deleteBook",
    "click .details-book": function () {
      this.openDetails();
    },
    "click .edit-book": function () {
      this.editBook();
    }
  },

  openDetails: function () {
    new BookDetailsView({
      model: this.model
    });
  },

  editBook: function () {
    new ModalView({
      model: this.model
    });
  },

  deleteBook: function (e) {
    this.model.destroy();
    this.remove();
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
