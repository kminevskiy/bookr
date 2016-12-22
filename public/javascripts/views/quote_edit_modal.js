var quoteModal = Handlebars.templates.quote_modal;

var QuoteEditModal = Backbone.View.extend({
  template: quoteModal,

  render: function () {
    this.toggleNoscroll();
    this.$el.html(this.template(this.model.toJSON()));

    $("#modal").html(this.$el).find("#edit-modal").fadeIn(300);

    return this;
  },

  toggleNoscroll: function () {
    $("body").toggleClass("no-scroll");
  },

  initialize: function (attrs) {
    this.listenTo(this, "manualClose", this.closeModal);
    this.render();
  },

  events: {
    submit: "updateQuote",
    "click .close": "closeModal"
  },

  updateQuote: function (e) {
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
    this.toggleNoscroll();
    this.$el.fadeOut(300, function () {
      this.remove();
    });
  }
});
