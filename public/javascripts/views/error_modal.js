var error_modal = Handlebars.templates.error;

var ErrorMessageView = Backbone.View.extend({
  template: error_modal,

  render: function () {
    this.$el.html(this.template(this.book));
    $("#error-message").html(this.$el);

    return this;
  },

  initialize: function (obj) {
    this.book = obj;
    this.listenTo(this, "destroyView", this.removeView);
  },

  removeView: function () {
    var self = this;
    this.$el.fadeOut(500, function () {
      self.remove();
    });
  }
});
