var fs = require("fs");
var path = require("path");
var dbMaster = require(path.resolve(path.dirname(__dirname), "local_modules/db_master"));

module.exports = function (router) {
  router.get("/all_stats", function (req, res) {
    dbMaster.getStats(function (statsObj) {
      res.json(statsObj);
    });
  });

  router.get("/stats*", function (req, res) {
    res.render("stats");
  });
};
