var Books = Backbone.Collection.extend({
  model: Book,

  url: "/books"
});
