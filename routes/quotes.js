var fs = require("fs");
var path = require("path");
var dbMaster = require(path.resolve(path.dirname(__dirname), "local_modules/db_master"));

module.exports = function (router) {
  router.get("/new_quote", function (req, res) {
    res.render("new_quote");
  });

  router.get("/quotes", function (req, res) {
    res.render("quotes");
  });

  router.get("/all_quotes", function (req, res) {
    var quotes = [];
    dbMaster.getQuotes(quotes, function () {
      res.json(quotes);
    });
  });

  router.post("/quotes", function (req, res) {
    var quote  = req.body;
    dbMaster.insertQuote(quote, function () {
      res.status(201).end();
    });
  });

  router.post("/quotes/:id", function (req, res) {
    var quote = req.body;
    dbMaster.updateQuote(quote, function () {
      res.json(quote);
    });
  });

  router.delete("/quotes/:id", function (req, res) {
    var quoteId = req.params.id;
    dbMaster.deleteQuote(quoteId, function () {
      res.status(200).end();
    });
  });
};

