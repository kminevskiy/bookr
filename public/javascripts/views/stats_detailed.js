var monthly = Handlebars.templates.stats_monthly;
var annual = Handlebars.templates.stats_annual;
var total = Handlebars.templates.stats_total;

var DetailedStatsView = Backbone.View.extend({
  id: "stats-detailed",

  className: "stats",

  templateMonthly: monthly,
  templateAnnual: annual,
  templateTotal: total,

  render: function () {

    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },

  initialize: function (attrs) {
    var page = attrs.page;

    switch (page) {
      case "month":
        this.template = this.templateMonthly;
        break;
      case "year":
        this.template = this.templateAnnual;
        break;
      case "total":
        this.template = this.templateTotal;
        break;
    }
  }
});

