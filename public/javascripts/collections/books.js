var Books = Backbone.Collection.extend({
  model: Book,

  url: "/books",

  initialize: function () {
    this.fetch({
      success: function (models) {
        new IndexView({ collection: models });
      }
    });
  }
});
