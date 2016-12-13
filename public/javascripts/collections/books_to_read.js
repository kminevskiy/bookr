var BooksToRead = Backbone.Collection.extend({
  model: Book,

  url: "/books_to_read"
});
