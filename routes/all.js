var path = require("path");
var express = require("express");
var router = express.Router();

var routes = ["index", "new", "reading_list"];

routes.forEach(function (r) {
  require(path.resolve(path.dirname(__dirname), "routes/" + r))(router);
});

module.exports = router;
