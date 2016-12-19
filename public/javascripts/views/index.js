var IndexView = Backbone.View.extend({
  tagName: "ul",

  attributes: {
    id: "index"
  },

  render: function () {
    if (this.collection.length) {
      if (this.emptyView) this.emptyView.trigger("destroyEmptyStub");

      this.collection.each(function (book) {
        var bookView = new BookView({ model: book });
        this.$el.append(bookView.render().el)
      }, this);

      $("#content").html(this.$el);
    } else {
      $("#content").html(this.emptyView.render().el);
    }
  },

  renderStubIfEmpty: function () {
    if (!this.collection.length) {
      this.emptyView = new EmptyStubView({ href: "/new" });
      $("#content").html(this.emptyView.render().el);
    }
  },

  initialize: function () {
    this.listenTo(this.collection, "remove", this.renderStubIfEmpty);
    this.emptyView = new EmptyStubView({ items: "notes", href: "/new" });
    this.render();
  }
});
