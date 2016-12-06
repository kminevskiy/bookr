var fs = require("fs");
var path = require("path");
var sqlite3 = require("sqlite3").verbose();

var dbFile = path.resolve(path.dirname(__dirname), "db/books.db");
var exists = fs.existsSync(dbFile);
var db = new sqlite3.Database(dbFile);
var db_file_size = fs.statSync(dbFile)["size"];

var dbMaster = {

  init: function () {
    db.serialize(function () {
      if (!db_file_size) {
        db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, author TEXT, title TEXT, description TEXT)")
      }
    });
  },

  close: function () {
    db.close(function () {
      console.log("Database has been successfully closed.");
    });
  },

  insert: function () {
    if (arguments.length === 3) {
      var query = db.prepare("INSERT INTO books VALUES(null, $author, $title, $description)", {
        $author: arguments[0],
        $title: arguments[1],
        $description: arguments[2]
      });
      query.run();
      return true;
    } else {
      return false;
    }
  },

  select: function (result, callback) {
    db.each("SELECT id, author, title, description FROM books", function (err, row) {
      result.push([row.id, row.author, row.title]);
    }, function () {
      callback()
    });
  }
}

module.exports = dbMaster;
