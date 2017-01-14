var fs = require("fs");
var path = require("path");
var request = require("request");
var sqlite3 = require("sqlite3").verbose();

var dbFile = path.resolve(path.dirname(__dirname), "db/books.db");
var db = new sqlite3.Database(dbFile);

var dbMaster = {
  init: function () {
    db.serialize(function () {
      if (!fs.existsSync(dbFile)) {
        db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, author TEXT, isbn VARCHAR(50), cover TEXT, title TEXT, rating TEXT, summary TEXT, date TEXT)");
        db.run("CREATE TABLE ideas (id INTEGER PRIMARY KEY, book_id INTEGER, idea1 TEXT, idea2 TEXT, idea3 TEXT, FOREIGN KEY (book_id) REFERENCES books(id))");
        db.run("CREATE TABLE booksToRead (id INTEGER PRIMARY KEY, author TEXT, isbn VARCHAR(50), title TEXT, cover TEXT, date TEXT)");
        db.run("CREATE TABLE quotes (id INTEGER PRIMARY KEY, author TEXT, quote TEXT, date TEXT)");
      }
    });
  },

  checkCoverExists: function (coverLink, callback) {
    var emptyCover = "/images/no_cover.png";
    var cover;

    request(coverLink, function (err, res) {
      cover = res.statusCode === 200 ? coverLink : emptyCover;
      callback(cover);
    });
  },

  getCurrentDate: function () {
    var date = (new Date()).toLocaleDateString();
    var thisMonth = date.slice(0, 1);
    thisMonth = thisMonth.length > 1 ? thisMonth : "0" + thisMonth;
    var thisYear = date.slice(4);
    return `${thisMonth}-${thisYear}`;
  },

  getQuotes: function (quotes, callback) {
    db.each("SELECT * FROM quotes ORDER BY date DESC", function (err, row) {
      quotes.push(row);
    }, callback);
  },

  insertQuote: function (quote, callback) {
    db.run('INSERT INTO quotes VALUES (null, $author, $quote, date("now"))', {
      $author: quote.author.trim(),
      $quote: quote.quote.trim()
    });

    callback();
  },

  updateQuote: function (quote, callback) {
    db.run("UPDATE quotes SET author = $author, quote = $quote WHERE id = $id", {
      $id: quote.id,
      $author: quote.author.trim(),
      $quote: quote.quote.trim()
    });

    callback();
  },

  deleteQuote: function (quoteId, callback) {
    db.run("DELETE FROM quotes WHERE id = $id", {
      $id: quoteId
    });

    callback();
  },

  getBooksToRead: function (books, callback) {
    db.each("SELECT * FROM booksToRead", function (err, row) {
      books.push(row);
    }, callback);
  },

  insertBookToRead: function (book, callback) {
    db.run('INSERT INTO booksToRead VALUES (null, $author, $isbn, $title, $cover, date("now"))', {
      $author: book.author.trim(),
      $title: book.title.trim(),
      $isbn: book.isbn,
      $cover: book.cover
    });

    callback();
  },

  deleteBookToRead: function (bookId, callback) {
    db.run("DELETE FROM booksToRead WHERE id = $id", {
      $id: bookId
    });

    callback();
  },

  insert: function (book, callback) {
    var bookId;

    db.run('INSERT INTO books VALUES (null, $author, $isbn, $cover, $title, $rating, $summary, date("now"))', {
      $title: book.title.trim(),
      $isbn: book.isbn,
      $cover: book.cover,
      $author: book.author.trim(),
      $rating: book.rating,
      $summary: book.summary.trim()
    }, function () {
      bookId = this.lastID;
      db.run("INSERT INTO ideas VALUES (null, $book_id, $idea1, $idea2, $idea3)", {
        $book_id: bookId,
        $idea1: book.idea1.trim(),
        $idea2: book.idea2.trim(),
        $idea3: book.idea3.trim()
    });

    callback();
  });
  },

  getAllBooks: function (books, callback) {
    db.each("SELECT books.id, books.date, title, author, isbn, cover, rating, summary, idea1, idea2, idea3 FROM books JOIN ideas ON books.id = ideas.book_id ORDER BY books.date DESC", function (err, row) {
      books.push(row);
    }, callback);
  },

  updateBook: function (book, callback) {
    db.run("UPDATE books SET author = $author, isbn = $isbn, cover = $cover, title = $title, rating = $rating, summary = $summary WHERE id = $id", {
      $id: book.id,
      $title: book.title.trim(),
      $isbn: book.isbn,
      $cover: book.cover,
      $author: book.author.trim(),
      $rating: book.rating,
      $summary: book.summary.trim()
    });

    db.run("UPDATE ideas SET idea1 = $idea1, idea2 = $idea2, idea3 = $idea3 WHERE book_id = $id", {
      $id: book.id,
      $idea1: book.idea1.trim(),
      $idea2: book.idea2.trim(),
      $idea3: book.idea3.trim()
    });

    callback();
  },

  deleteBook: function (bookId, callback) {
    db.run("DELETE FROM books WHERE id = $id", {
      $id: bookId
    });

    db.run("DELETE FROM ideas WHERE book_id = $id", {
      $id: bookId
    });

    callback();
  },

  getStats: function (callback) {
    var thisDate = this.getCurrentDate();
    var thisYear = thisDate.slice(3);
    var statsObj = {}, tempMonthYear = {}, tempYears = {};
    var yearMonth, prevYear, year, years;

    db.serialize(function () {

      // get total number of books
      db.get("SELECT COUNT(*) AS total FROM books", function (err, row) {
        statsObj.totalBooks = row.total;
      });

      // create an object with year_month(2012-12) as keys and number of books as values
      db.all('SELECT COUNT(*) AS total, strftime("%m-%Y", date) as month_year FROM books GROUP BY month_year', function (err, rows) {
        rows.forEach(function (row) {
          yearMonth = row.month_year;
          if (tempMonthYear[yearMonth]) tempMonthYear[yearMonth] += row.total;
          else tempMonthYear[yearMonth] = row.total;
        });

        statsObj.monthsAndBooks = tempMonthYear;
      });

      // create an object with years as keys and number of books as values
      db.all('SELECT COUNT(*) AS total, strftime("%Y", date) AS year FROM books GROUP BY year ORDER BY year ASC', function (err, rows) {
        rows.forEach(function (row) {
          year = row.year;
          if (tempYears[year]) tempYears[year] += row.total;
          else tempYears[year] = row.total;
        });

        statsObj.yearsAndBooks = tempYears;

        years = Object.keys(statsObj.yearsAndBooks);
        prevYear = years[years.length - 2] ? statsObj.yearsAndBooks[years[years.length - 2]] : 0;

        statsObj.booksPrevYear = prevYear;
        statsObj.booksThisYear = statsObj.yearsAndBooks[years[years.length - 1]];
      });

      // get number of books read this month
      db.get('SELECT COUNT(*) AS total, strftime("%m-%Y", date) as month_year FROM books WHERE month_year LIKE $date', {
        $date: "%" + thisDate + "%"
      }, function (err, row) {
        statsObj.booksThisMonth = row.total;
      });

      // get average number of books
      db.get("SELECT (COUNT(*) / 12.0) AS average FROM books", function (err, row) {
        statsObj.avgCount = +row.average.toFixed(2);
      });

      // get books count for previous month
      var prevMonthData, booksPrevMonth;

      db.all('SELECT COUNT(*) AS total, strftime("%m-%Y", date) AS month_year FROM books GROUP BY month_year ORDER BY month_year DESC', function (err, rows) {
        rows.forEach(function (row, rowIndex) {
          // if iteration month is current month AND previous month exists => set property for previous month
            console.log(row.month_year, thisDate, rows[rowIndex - 1]);
          if (row.month_year === thisDate && rows[rowIndex - 1]) {
            prevMonthData = rows[rowIndex - 1];
          }
        });
        if (prevMonthData) {
          booksPrevMonth = prevMonthData.month_year;
          statsObj.booksPrevMonth = prevMonthData.total;
        } else statsObj.booksPrevMonth = 0;

        callback(statsObj);
      });
    });
  }
}

module.exports = dbMaster;
