var path = require("path");
var sqlite3 = require("sqlite3").verbose();

var dbFile = path.resolve(path.dirname(__dirname), "db/books.db");
var db = new sqlite3.Database(dbFile);

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    var books = [];

    db.each("SELECT * FROM books", function (err, row) {
      books.push([row.id, row.author, row.title]);
    }, function (err, rows) {
      res.render("index", {
        query: books,
        total: rows
      });
    });
  });
}
