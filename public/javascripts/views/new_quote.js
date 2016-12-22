var newQuoteForm = Handlebars.templates.new_quote;

var NewQuoteView= Backbone.View.extend({
  attributes: {
    id: "new-form"
  },

  initialize: function () {
    this.render();
  },

  template: newQuoteForm,

  render: function () {
    this.$el.html(this.template());
    $("#content").html(this.$el);
  },

  events: {
    submit: "submitQuote",
    "click input[type='button']": "resetForm"
  },

  resetForm: function () {
    this.$("form")[0].reset();
  },

  submitQuote: function (e) {
    e.preventDefault();
    var $form = this.$("form");
    var self = this;

    $.ajax({
      url: $form.attr("action"),
      method: $form.attr("method"),
      data: $form.serialize(),
      complete: function () {
        app.trigger("redirectToQuotesList");
        self.remove();
      }
    });
  }
});
