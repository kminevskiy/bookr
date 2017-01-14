var book = Handlebars.templates.book;

var BookView = Backbone.View.extend({
  tagName: "li",

  className: "cf",

  template: book,

  events: {
    "click .delete": "deleteBook",
    "click .details": function () {
      this.openDetails();
    },
    "click .edit": function () {
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
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }
});
