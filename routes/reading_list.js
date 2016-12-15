var fs = require("fs");
var path = require("path");
var dbMaster = require(path.resolve(path.dirname(__dirname), "local_modules/db_master"));

module.exports = function (router) {
  router.get("/read", function (req, res) {
    res.render("read");
  });

  router.get("/books_to_read", function (req, res) {
    var books = [];
    dbMaster.getBooksToRead(books, function () {
      res.json(books);
    });
  });

  router.post("/books_to_read", function (req, res) {
    var book = req.body;
    var cover = "http://covers.openlibrary.org/b/isbn/" + book.isbn + "-S.jpg?default=false";
    dbMaster.checkCoverExists(cover, function (resultingCover) {
      book.cover = resultingCover;
      dbMaster.insertBookToRead(book, function () {
        res.status(200).end();
      });
    });
  });

  router.delete("/books_to_read", function (req, res) {
    var id = req.body.id;
    dbMaster.deleteBookToRead(id, function () {
      res.status(200).end();
    });
  });
};

