var router = new (Backbone.Router.extend({
  routes: {
    "new": app.newBookForm.bind(app)
  },

  index: function () { app.indexView() },

  initialize: function () {
    this.route(/^\/?$/, "index", this.index);
  }
}))();

Backbone.history.start({ pushState: true });

$("header").on("click", "a[href^='/']", function (e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true });
});

