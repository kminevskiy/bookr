var stats = Handlebars.templates.stats_index;

var StatsView = Backbone.View.extend({
  template: stats,

  contentEl: $("#content"),

  render: function () {
    this.$el.html(this.template());
    $("#sidebar").html(this.$el);

    this.contentEl.html(this.page.render().el);
  },

  initialize: function (attrs) {
    this.page = new DetailedStatsView({ model: this.model, page: attrs.page });

    this.render();
  }
});
