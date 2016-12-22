var Quote = Backbone.Model.extend({
  initialize: function (attrs) {
    this.url = "/quotes/" + attrs.id;
  }
});
