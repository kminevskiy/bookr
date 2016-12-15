var newBookForm = Handlebars.templates.new_book;

var NewBookView = Backbone.View.extend({
  attributes: {
    id: "new-book-form"
  },

  initialize: function () {
    this.render();
  },

  template: newBookForm,

  render: function () {
    this.$el.html(this.template());
    $("#content").html(this.$el);
  },

  events: {
    submit: "submitBook",
    "blur #isbn": "isbnExists",
    "click input[type='button']": "resetForm"
  },

  isbnExists: function (e) {
    var newISBN = $(e.currentTarget).val();
    var bookFound = app.books.findWhere({ isbn: newISBN });

    if (bookFound) {
      this.errorMessage = new ErrorMessageView(bookFound.toJSON());
      this.errorMessage.render().$el.hide().fadeIn(500);
    } else {
      if (this.errorMessage) this.errorMessage.trigger("destroyView");
      delete this.errorMessage;
    }
  },

  resetForm: function () {
    this.$("form")[0].reset();
  },

  submitBook: function (e) {
    e.preventDefault();
    var $form = this.$("form");
    var self = this;

    if (!this.errorMessage) {
      $.ajax({
        url: $form.attr("action"),
        method: $form.attr("method"),
        data: $form.serialize(),
        complete: function () {
          app.trigger("redirectToNotesList");
          self.remove();
        }
      });
    }
  }
});
