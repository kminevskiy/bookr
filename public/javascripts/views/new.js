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
    var fieldValue = $(e.currentTarget).val();
    var self = this;

    $.ajax({
      url: "/check_isbn",
      method: "post",
      data: {input: fieldValue},
      success: function (data) {
        if (data.book) {
          self.errorMessage = new ErrorMessageView(data.book);
          self.errorMessage.render();
        } else {
          self.errorMessage ? self.errorMessage.remove() : 0;
        }
      }
    });
  },

  resetForm: function () {
    this.$("form")[0].reset();
  },

  submitBook: function (e) {
    e.preventDefault();
    var $form = this.$("form");

    if (!this.errorMessage) {
      $.ajax({
        url: $form.attr("action"),
        method: $form.attr("method"),
        data: $form.serialize()
      });
      app.trigger("goHome");
      this.remove();
    }
  }
});
