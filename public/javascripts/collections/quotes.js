var Quotes = Backbone.Collection.extend({
  model: Quote,

  url: "/all_quotes"
});
