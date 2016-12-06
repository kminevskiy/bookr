var modal = Handlebars.templates.modal;

var ModalView = Backbone.View.extend({
  template: modal,

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    $("#modal").html(this.$el).find("#edit-modal").fadeIn(500);

    return this;
  },

  initialize: function () {
    this.listenTo(this, "manualClose", this.closeModal);
    this.render();
  },

  events: {
    submit: "updateBook",
    "click .close": "closeModal"
  },

  updateBook: function (e) {
    e.preventDefault();
    var $form = this.$("form");
    var self = this;

    $.ajax({
      url: $form.attr("action"),
      method: $form.attr("method"),
      data: $form.serialize(),
      success: function (updatedModel) {
        self.model.set(updatedModel);
      }
    });
    this.trigger("manualClose");
  },

  closeModal: function () {
    this.$("#edit-modal").fadeOut(500, function () {
      this.remove();
    });
  }
});
