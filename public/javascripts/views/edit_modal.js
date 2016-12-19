var modal = Handlebars.templates.modal;

var ModalView = Backbone.View.extend({
  template: modal,

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$("select")[0].selectedIndex = this.rating;
    $("#modal").html(this.$el).find("#edit-modal").fadeIn(500);

    return this;
  },

  initialize: function (attrs) {
    this.rating = this.convertRating();
    this.offset = attrs.offset;
    this.listenTo(this, "manualClose", this.closeModal);
    this.render();
  },

  convertRating: function () {
    var ratingString = this.model.get("rating");
    var ratingInt;

    switch (ratingString) {
      case "Horrible":
        ratingInt = 0;
        break;
      case "Bad":
        ratingInt = 1;
        break;
      case "Okay":
        ratingInt = 2;
        break;
      case "Good":
        ratingInt = 3;
        break;
      case "Excellent":
        ratingInt = 4;
        break;
    }
    return ratingInt;
  },

  events: {
    submit: "updateBook",
    "click .close": "closeModal"
  },

  scrollBackToBook: function (offset) {
    $("html, body").animate({
      scrollTop: offset
    }, 600);
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
    this.scrollBackToBook(this.offset);
    this.$("#edit-modal").fadeOut(500, function () {
      this.remove();
    });
  }
});
