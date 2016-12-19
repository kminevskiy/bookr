var BookToRead = Backbone.Model.extend({
  initialize: function (attrs) {
    this.url = "/books_to_read/" + attrs.id;
  }
});
