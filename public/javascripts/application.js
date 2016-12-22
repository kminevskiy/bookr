var app = {
  bindEvents: function () {
    _.extend(this, Backbone.Events);
    this.on("redirectToNotesList", this.updateUrlToNotes);
    this.on("redirectToReadList", this.updateUrlToReadList);
    this.on("redirectToQuotesList", this.updateUrlToQuotesList);
  },

  updateUrlToNotes: function () {
    Backbone.history.navigate("/", { trigger: true });
  },

  updateUrlToReadList: function () {
    Backbone.history.navigate("/read", { trigger: true });
  },

  updateUrlToQuotesList: function () {
    Backbone.history.navigate("/quotes", { trigger: true });
  },

  init: function () {
    _.bindAll(this, "newNote", "notesIndex", "readingIndex", "newBook", "quotesIndex", "newQuote");
    this.menu = new MenuView();
    this.books = new Books();
    this.readingList = new BooksToRead();
    this.quotes = new Quotes();
    this.bindEvents();
  },

  viewsCleanup: function (views) {
    var args;
    if (arguments.length > 1) {
      args = [].slice.call(arguments);
      args.forEach(function (view) {
        if (view) {
          view.remove();
          view.undelegateEvents();
        }
      });
    }
  },

  renderMenu: function (action, href) {
    this.menu.render({
      action: action,
      href: href
    });
  },

  newNote: function () {
    this.renderMenu("Add note", "/new");
    this.newItem = new NewNoteView();
  },

  newBook: function () {
    this.renderMenu("Add book", "/new_toread");
    this.newItem = new NewToReadView();
  },

  newQuote: function () {
    this.renderMenu("Add quote", "/new_quote");
    this.newItem = new NewQuoteView();
  },

  notesIndex: function () {
    this.viewsCleanup(app.view, app.menu, app.newItem);
    this.renderMenu("Add note", "/new");
    this.books.fetch({
      success: function (models) {
        app.view = new IndexView({ collection: models });
      }
    });
  },

  readingIndex: function () {
    this.viewsCleanup(app.view, app.menu, app.newItem);
    this.renderMenu("Add book", "/new_toread");
    this.readingList.fetch({
      success: function (models) {
        app.view = new ReadIndexView({ collection: models });
      }
    });
  },

  quotesIndex: function () {
    this.viewsCleanup(app.view, app.menu, app.newItem);
    this.renderMenu("Add quote", "/new_quote");
    this.quotes.fetch({
      success: function (models) {
        app.view = new QuotesIndexView({ collection: models });
      }
    });
  }
}
