var modal = Handlebars.templates.modal;

var ModalView = Backbone.View.extend({
  template: modal,

  render: function () {
    this.toggleNoscroll();
    this.$el.html(this.template(this.model.toJSON()));
    // Set previously selected rating as default
    this.$("select")[0].selectedIndex = this.rating;

    $("#modal").html(this.$el).find("#edit-modal").fadeIn(500);

    return this;
  },

  toggleNoscroll: function () {
    $("body").toggleClass("no-scroll");
  },

  initialize: function (attrs) {
    this.rating = this.convertRating();
    this.listenTo(this, "manualClose", this.closeModal);
    this.render();
  },

  convertRating: function () {
    var ratingString = this.model.get("rating");
    var ratingInt;

    switch (ratingString) {
      case "Horrible": return 0
      case "Bad": return 1
      case "Okay": return 2
      case "Good": return 3
      case "Excellent": return 4
    }
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
    this.toggleNoscroll();
    this.$el.fadeOut(500, function () {
      this.remove();
    });
  }
});
