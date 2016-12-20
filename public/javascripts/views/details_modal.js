var details = Handlebars.templates.details;

var BookDetailsView = Backbone.View.extend({
  template: details,

  render: function () {
    this.toggleNoscroll();
    this.$el.html(this.template(this.model.toJSON()));
    $("#modal").html(this.$el).find("#details").fadeIn(500);

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
    "click .close": "closeModal"
  },

  closeModal: function () {
    this.toggleNoscroll();
    this.$("#details").fadeOut(500, function () {
      this.remove();
    });
  }
});
