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
    "click input[type='button']": "resetForm"
  },

  resetForm: function () {
    this.$("form")[0].reset();
  },

  submitBook: function (e) {
    e.preventDefault();
    var $form = this.$("form");

    $.ajax({
      url: $form.attr("action"),
      method: $form.attr("method"),
      data: $form.serialize()
    });
    $form[0].reset();
    app.trigger("goHome");
  }
});
