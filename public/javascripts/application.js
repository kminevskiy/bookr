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
    this.createCollections([{"books": Books}, {"readingList": BooksToRead}]);
    this.bindEvents();
  },

  createCollections: function (names) {
    var args;
    if (arguments.length > 1) {
      args = [].slice.call(arguments);
      args.forEach(function (name, constr) {
        this.name = new constr();
        this.name.fetch();
      }, this);
    }
  },

  menuView: function (action, href) {
    this.menu.render({
      action: action,
      href: href
    });
  },

  newBookForm: function () {
    this.menuView("Add note", "/new");
    this.newBook = new NewBookView();
  },

  indexView: function () {
    this.viewsCleanup(app.view, app.menu);
    this.menuView("Add note", "/new");
    this.books = new Books();
    this.books.fetch({
      success: function (models) {
        app.view = new IndexView({ collection: models });
      }
    });
  },

  showReadingList: function () {
    this.viewsCleanup([app.view, app.menu]);
    this.menuView("Add book", "/new_toread");
    this.readingList = new BooksToRead();
    this.readingList.fetch({
      success: function (models) {
        app.view = new ReadIndexView({ collection: models });
      }
    });
  },

  addBookToRead: function () {
    this.menuView("Add book", "/new_toread");
    this.newBookToRead = new NewToReadView();
  },

  viewsCleanup: function (views) {
    var args;
    if (arguments.length > 1) {
      args = [].slice.call(arguments);
      args.forEach(function (view) {
        if (view) view.remove();
      });
    }
  }
}
