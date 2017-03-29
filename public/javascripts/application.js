var app = {
  bindEvents: function () {
    _.extend(this, Backbone.Events);
    this.listenTo(this, "redirectToNotesList", this.updateUrlToNotes);
    this.listenTo(this, "redirectToReadList", this.updateUrlToReadList);
    this.listenTo(this, "redirectToQuotesList", this.updateUrlToQuotesList);
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
    _.bindAll(this, "newNote", "notesIndex", "readingIndex", "newBook", "quotesIndex", "newQuote", "statsIndex");
    this.menu = new MenuView();
    this.books = new Books();
    this.readingList = new BooksToRead();
    this.quotes = new Quotes();
    this.stats = new Stats();
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
  },

  statsIndex: function (page) {
    this.viewsCleanup(app.view, app.menu, app.newItem);
    this.renderMenu();
    this.getStats(function (stats) {
      app.view = new StatsView({ model: stats, page: page });
    });
  },

  getStats: function (callback) {
    this.stats.fetch({
      success: function (stats) {
        callback(stats);
      }
    });
  }
}

Handlebars.registerHelper("booksReadMonthly", function (booksNum) {
  if (booksNum === 0) return "You haven't read anything this month";
  else if (booksNum > 1) return `You\`ve read ${booksNum} books this month`;
  else return "You've read 1 book this month";
});

Handlebars.registerHelper("readingMonthlyPerformance", function (thisMonth, avgMonth) {
  if (thisMonth === 0 && avgMonth === 0) return "There is no reading history yet.";
  if (thisMonth === avgMonth) return "So far you've read about the same compared to your average reading performance.";
  if (thisMonth > avgMonth) {
    return "You've read more than your monthly average.";
  } else {
    return "You've read less than your monthly average.";
  }
});

Handlebars.registerHelper("compareMonths", function (thisMonth, prevMonth) {
  if (thisMonth === 0 && prevMonth === 0) return "There is no reading history yet.";
  if (thisMonth === prevMonth) return "So far you've read about the same compared to your previous month's performance.";
  if (thisMonth > prevMonth) {
    return "You've read more than a month before.";
  } else {
    return "You've read less than a month before.";
  }
});

Handlebars.registerHelper("cheerUp", function (thisMonth, prevMonth) {
  if (thisMonth === prevMonth) return "Keep up the good work! Read on!";
  else if (thisMonth < prevMonth) return "You can do it!";
  else return "Excellent work! Keep on reading!";
});

Handlebars.registerHelper("currentMonthString", function () {
  var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[(new Date()).getMonth()];
});

Handlebars.registerHelper("currentYearString", function () {
  return (new Date()).toDateString().slice(11);
});

Handlebars.registerHelper("booksReadAnnually", function (booksNum) {
  if (booksNum === 0) return "You haven't read anything this year so far";
  else if (booksNum > 1) return `You\`ve read ${booksNum} books this year so far`;
  else return "You've read 1 book this year so far";
});

Handlebars.registerHelper("compareYears", function (thisYear, prevYear) {
  if (!thisYear && !prevYear) return "There is no reading history yet.";
  else if (thisYear === prevYear) return "Your reading performance is about the same as a year before.";
  else if (thisYear > prevYear) {
    return "You read more this year than a year before.";
  } else {
    return "You read less this year than a year before.";
  }
});

