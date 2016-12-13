var app = {
  bindEvents: function () {
    _.extend(this, Backbone.Events);
    this.on("redirectToNotesList", this.updateUrlToNotes);
    this.on("redirectToReadList", this.updateUrlToReadList);
  },

  updateUrlToNotes: function () {
    Backbone.history.navigate("/", { trigger: true });
  },

  updateUrlToReadList: function () {
    Backbone.history.navigate("/read", { trigger: true });
  },

  init: function () {
    _.bindAll(this, "newBookForm", "indexView", "showReadingList", "addBookToRead");
    this.books = new Books();
    this.books.fetch();
    this.bindEvents();
  },

  newBookForm: function () {
    this.newBook = new NewBookView();
  },

  indexView: function () {
    this.menu = new DefaultMenuView();
    this.books = new Books();
    this.books.fetch({
      success: function (models) {
        new IndexView({ collection: models });
      }
    });
  },

  showReadingList: function () {
    this.menu = new ToReadMenuView();
    this.readingList = new BooksToRead();
    this.readingList.fetch({
      success: function (models) {
        new ReadIndexView({ collection: models });
      }
    });
  },

  addBookToRead: function () {
    this.newBookToRead = new NewToReadView();
  }
}
