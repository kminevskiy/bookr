var IndexView = Backbone.View.extend({
  tagName: "ul",

  attributes: {
    id: "index"
  },

  render: function () {
    this.collection.each(function (book) {
      var bookView = new BookView({ model: book });
      this.$el.append(bookView.render().el)
    }, this);

    $("#content").html(this.$el);
  },

  initialize: function () {
    this.render();
  }
});
