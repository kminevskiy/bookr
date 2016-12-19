var BooksToRead = Backbone.Collection.extend({
  model: BookToRead,

  url: "/books_to_read"
});
