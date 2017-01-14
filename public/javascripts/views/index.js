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
        book.view = bookView;
        this.$el.append(bookView.render().el)
      }, this);

      $("#content").html(this.$el);
    } else {
      $("#content").html(this.emptyView.render().el);
    }
    $("#content").prepend(this.sortElement.render().el);
  },

  renderStubIfEmpty: function () {
    if (!this.collection.length) {
      $("#content").html(this.emptyView.render().el);
    }
  },

  sortNotes: function (year) {
    var noteDate;
    this.collection.each(function (note) {
      note.view.$el.detach();
    });
    if (year !== "all") {
      this.collection.each(function (n) {
        noteDate = (n.get("date")).slice(0, 4);
        if (noteDate === year) {
          this.$el.append(n.view.el);
        }
      }, this);
    } else {
      this.collection.each(function (n) {
        this.$el.append(n.view.el);
      }, this);
    }
    $("#content").append(this.el);
  },

  getUniqueYears: function () {
    var years = this.collection.pluck("date").map(function (date) {
      return date.slice(0, 4);
    });
    return _.uniq(years);
  },

  initialize: function () {
    this.listenTo(this.collection, "remove", this.renderStubIfEmpty);
    this.listenTo(this, "newSort", this.sortNotes);
    this.emptyView = new EmptyStubView({ items: "notes", href: "/new" });
    this.sortElement = new IndexSortView({ years: this.getUniqueYears() });
    this.render();
  }
});
