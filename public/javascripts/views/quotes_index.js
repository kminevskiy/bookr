var QuotesIndexView = Backbone.View.extend({
  tagName: "ul",

  render: function () {
    $("#sidebar").empty()
    if (this.collection.length) {
      if (this.emptyView) this.emptyView.trigger("destroyEmptyStub");

      this.collection.each(function (quote) {
        var quoteView = new QuoteView({ model: quote });
        this.$el.append(quoteView.render().el);
      }, this);

      $("#content").html(this.$el);
    } else {
      $("#content").html(this.emptyView.render().el);
    }
  },

  renderStubIfEmpty: function () {
    if (!this.collection.length) {
      $("#content").html(this.emptyView.render().el);
    }
  },

  initialize: function () {
    this.listenTo(this.collection, "remove", this.renderStubIfEmpty);
    this.emptyView = new EmptyStubView({ items: "quotes", href: "/new_quote" });
    this.render();
  }

});
