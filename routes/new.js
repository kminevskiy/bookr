var fs = require("fs");
var path = require("path");
var sqlite3 = require("sqlite3").verbose();

var dbFile = path.resolve(path.dirname(__dirname), "db/books.db");
var db = new sqlite3.Database(dbFile);
var db_file_size = fs.statSync(dbFile)["size"];

module.exports = function (router) {
  router.get("/new", function (req, res) {
    res.render("new");
  });

  router.get("/books", function (req, res) {
    var books = [];

    db.each("SELECT * FROM books", function (err, row) {
      books.push(row);
    }, function (err, rows) {
        res.json(books);
    });
  });

  router.post("/books", function (req, res) {
    var bookData = req.body;
    var cover = "http://covers.openlibrary.org/b/isbn/" + req.body.isbn + "-M.jpg";

    db.run("INSERT INTO books VALUES (null, $author, $isbn, $cover, $title, $description)", {
      $title: bookData.title,
      $isbn: bookData.isbn,
      $cover: cover,
      $author: bookData.author,
      $description: bookData.description
    }, function (err) {
      if (err) console.log(err);
      else console.log("Created.");
    });
    res.status(200).end();
  });

  router.put("/books/:id", function (req, res) {
    var bookData = req.body;
    var cover = "http://covers.openlibrary.org/b/isbn/" + req.body.isbn + "-M.jpg";
    bookData.cover = cover;

    db.run("UPDATE books SET author=$author, isbn=$isbn, cover=$cover, title=$title, description=$description WHERE id = $id", {
      $id: bookData.id,
      $title: bookData.title,
      $isbn: bookData.isbn,
      $cover: bookData.cover,
      $author: bookData.author,
      $description: bookData.description
    }, function (err) {
      if (err) console.log(err);
      else console.log("Updated.");
    });
    res.json(bookData);
  });


  router.delete("/books/:id", function (req, res) {
    var bookId = req.params.id;

    db.run("DELETE FROM books WHERE id = $id", {
      $id: bookId
    }, function (err) {
      if (err) console.log(err);
      else console.log("Deleted.");
    });

    res.status(200).end();
  });

  router.post("/check_isbn", function (req, res) {
    var isbn = req.body.input;

    db.get("SELECT title, isbn FROM books WHERE isbn = $isbn", {
      $isbn: isbn
    }, function (err, row) {
      res.json( row ? {book: row} : {recordExists: false});
    });
  });

  }
