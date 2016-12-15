var ReadIndexView = Backbone.View.extend({
  tagName: "ul",

  attributes: {
    id: "read-index"
  },

  render: function () {
    if (this.collection.length) {
      if (this.emptyView) this.emptyView.trigger("destroyEmptyStub");

      this.collection.each(function (book) {
        var bookView = new BookToReadView({ model: book });
        this.$el.append(bookView.render().el);
      }, this);

      $("#content").html(this.$el);
    } else {
      $("#content").html(this.emptyView.render().el);
    }
  },

  renderStubIfEmpty: function () {
    if (!this.collection.length) {
      this.emptyView = new EmptyStubView({ href: "/new_toread" });
      $("#content").html(this.emptyView.render().el);
    }
  },

  initialize: function () {
    this.listenTo(this.collection, "remove", this.renderStubIfEmpty);
    this.emptyView = new EmptyStubView({ href: "/new_toread" });
    this.render();
  }
});
