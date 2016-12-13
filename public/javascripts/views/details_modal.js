var details = Handlebars.templates.details;

var BookDetailsView = Backbone.View.extend({
  template: details,

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    $("#modal").html(this.$el).find("#details").fadeIn(500);

    return this;
  },

  initialize: function () {
    this.listenTo(this, "manualClose", this.closeModal);
    this.render();
  },

  events: {
    "click .close": "closeModal"
  },

  closeModal: function () {
    this.$("#details").fadeOut(500, function () {
      this.remove();
    });
  }

});
