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
    this.menu = new MenuView();
    this.books = new Books();
    this.books.fetch();
    this.bindEvents();
  },

  newBookForm: function () {
    this.newBook = new NewBookView();
  },

  indexView: function () {
    if (this.view) this.view.remove();
    this.menu.render({
      action: "Add note",
      href: "/new"
    });
    this.books = new Books();
    this.books.fetch({
      success: function (models) {
        app.view = new IndexView({ collection: models });
      }
    });
  },

  showReadingList: function () {
    if (this.view) this.view.remove();
    this.menu.render({
      action: "Add book",
      href: "/new_toread"
    });
    this.readingList = new BooksToRead();
    this.readingList.fetch({
      success: function (models) {
        app.view = new ReadIndexView({ collection: models });
      }
    });
  },

  addBookToRead: function () {
    this.newBookToRead = new NewToReadView();
  }
}
