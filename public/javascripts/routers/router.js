var router = new (Backbone.Router.extend({
  routes: {
    "new": app.newNote,
    "read": app.readingIndex,
    "new_toread": app.newBook,
    "new_quote": app.newQuote,
    "quotes": app.quotesIndex,
    "stats/:timeframe": "statsIndex"
  },

  statsIndex: function (page) {
    app.statsIndex(page);
  },

  index: function () { app.notesIndex() },

  initialize: function () {
    this.route(/^\/?$/, "index", this.index);
  }
}))();

Backbone.history.start({ pushState: true });

$("nav").on("click", "a", function (e) {
  e.preventDefault();
  app.menu.trigger("navChange", $("nav a").index(e.target));
});

$(document).on("click", "a[href^='/']", function (e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true });
});
