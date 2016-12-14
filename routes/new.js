var path = require("path");
var request = require("request");
var dbMaster = require(path.resolve(path.dirname(__dirname), "local_modules/db_master"));

function checkCoverExists (coverLink, callback) {
  var emptyCover = "/images/no_cover.png";
  var cover;

  request(coverLink, function (err, res) {
    cover = res.statusCode === 200 ? coverLink : emptyCover;
    callback(cover);
  });
}

module.exports = function (router) {
  router.get("/new", function (req, res) {
    res.render("new");
  });

  router.get("/books", function (req, res) {
    var books = [];
    dbMaster.getAllBooks(books, function () {
      res.json(books);
    });
  });

  router.post("/books", function (req, res) {
    var book = req.body;
    var cover = "http://covers.openlibrary.org/b/isbn/" + book.isbn + "-M.jpg?default=false";
    checkCoverExists(cover, function (resultingCover) {
      book.cover = resultingCover;
      dbMaster.insert(book, function () {
        res.status(200).end();
      });
    });
  });

  router.put("/books/:id", function (req, res) {
    var book = req.body;
    var cover = "http://covers.openlibrary.org/b/isbn/" + book.isbn + "-M.jpg?default=false";
    checkCoverExists(cover, function (resultingCover) {
      book.cover = resultingCover;
      dbMaster.updateBook(book, function () {
        res.json(book);
      });
    });
  });

  router.delete("/books/:id", function (req, res) {
    var bookId = req.params.id;
    dbMaster.deleteBook(bookId, function () {
      res.status(200).end();
    });
  });
};
