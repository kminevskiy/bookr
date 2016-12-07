var error_modal = Handlebars.templates.error;

var ErrorMessageView= Backbone.View.extend({
  template: error_modal,

  render: function () {
    this.$el.html(this.template(this.book));
    $("#error-message").html(this.$el);
  },

  initialize: function (obj) {
    this.book = obj;
  }
});
