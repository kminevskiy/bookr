var Book = Backbone.Model.extend({
  initialize: function (attrs) {
    this.url = "/books/" + attrs.id;
  }
});
