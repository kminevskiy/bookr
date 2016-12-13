var router = new (Backbone.Router.extend({
  routes: {
    "new": app.newBookForm,
    "read": app.showReadingList,
    "new_toread": app.addBookToRead
  },

  index: function () { app.indexView() },

  initialize: function () {
    this.route(/^\/?$/, "index", this.index);
  }
}))();

Backbone.history.start({ pushState: true });

$(document).on("click", "a[href^='/']", function (e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true });
});

