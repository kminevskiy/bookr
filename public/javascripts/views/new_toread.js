var newBookToRead = Handlebars.templates.new_to_read;

var NewToReadView = Backbone.View.extend({
  attributes: {
    id: "new-form"
  },

  template: newBookToRead,

  render: function () {
    this.$el.html(this.template());
    $("#content").html(this.el)
  },

  initialize: function () {
    this.render();
  },

  events: {
    submit: "submitBookToRead",
    "click .new-reset": "resetForm"
  },

  submitBookToRead: function (e) {
    e.preventDefault();
    var $form = this.$("form");
    var self = this;

    $.ajax({
      url: $form.attr("action"),
      method: $form.attr("method"),
      data: $form.serialize(),
      complete: function () {
        app.trigger("redirectToReadList");
        self.remove();
      }
    });
  },

  resetForm: function () {
    this.$("form")[0].reset();
  }
});
