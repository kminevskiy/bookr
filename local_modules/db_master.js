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
        db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, author TEXT, isbn VARCHAR(50), cover TEXT, title TEXT, summary TEXT, date TEXT)");
        db.run("CREATE TABLE ideas (id INTEGER PRIMARY KEY, book_id INTEGER, idea1 TEXT, idea2 TEXT, idea3 TEXT, FOREIGN KEY (book_id) REFERENCES books(id))");
        db.run("CREATE TABLE booksToRead (id INTEGER PRIMARY KEY, author TEXT, isbn VARCHAR(50), title TEXT, cover TEXT, date TEXT)");
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

  getBooksToRead: function (books, callback) {
    db.each("SELECT * FROM booksToRead", function (err, row) {
      books.push(row);
    }, callback);
  },

  insertBookToRead: function (book, callback) {
    db.run('INSERT INTO booksToRead VALUES (null, $author, $isbn, $title, $cover, date("now"))', {
      $author: book.author,
      $title: book.title,
      $isbn: book.isbn,
      $cover: book.cover
    }, function (err) {
      console.log(err);
    });

    callback();
  },

  deleteBookToRead: function (bookId, callback) {
    db.run("DELETE FROM booksToRead WHERE id = $id", {
      $id: bookId
    }, function (err) {
      if (err) console.log(err);
      else console.log("Deleted.");
    });

    callback();
  },

  insert: function (book, callback) {
    var bookId;

    db.run('INSERT INTO books VALUES (null, $author, $isbn, $cover, $title, $summary, date("now"))', {
      $title: book.title,
      $isbn: book.isbn,
      $cover: book.cover,
      $author: book.author,
      $summary: book.summary
    }, function () {
      bookId = this.lastID;
      db.run("INSERT INTO ideas VALUES (null, $book_id, $idea1, $idea2, $idea3)", {
        $book_id: bookId,
        $idea1: book.idea1,
        $idea2: book.idea2,
        $idea3: book.idea3
    });

    callback();
  })
  },

  getAllBooks: function (books, callback) {
    db.each("SELECT books.id, books.date, title, author, isbn, cover, summary, idea1, idea2, idea3 FROM books JOIN ideas ON books.id = ideas.book_id", function (err, row) {
      books.push(row);
    }, callback);
  },

  updateBook: function (book, callback) {
    db.run("UPDATE books SET author = $author, isbn = $isbn, cover = $cover, title = $title, summary = $summary WHERE id = $id", {
      $id: book.id,
      $title: book.title,
      $isbn: book.isbn,
      $cover: book.cover,
      $author: book.author,
      $summary: book.summary
    }, function (err) {
      if (err) console.log(err);
      else console.log("Updated.");
    });

    db.run("UPDATE ideas SET idea1 = $idea1, idea2 = $idea2, idea3 = $idea3 WHERE book_id = $id", {
      $id: book.id,
      $idea1: book.idea1,
      $idea2: book.idea2,
      $idea3: book.idea3
    });

    callback();
  },

  deleteBook: function (bookId, callback) {
    db.run("DELETE FROM books WHERE id = $id", {
      $id: bookId
    }, function (err) {
      if (err) console.log(err);
      else console.log("Deleted.");
    });

    db.run("DELETE FROM ideas WHERE book_id = $id", {
      $id: bookId
    }, function (err) {
      if (err) console.log(err);
      else console.log("Ideas deleted.");
    });

    callback();
  }
}

module.exports = dbMaster;
