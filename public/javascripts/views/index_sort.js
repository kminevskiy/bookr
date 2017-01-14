var select = Handlebars.templates.select;

var IndexSortView = Backbone.View.extend({
  id: "sort-order",

  template: select,

  render: function () {
    this.$el.html(this.template({ years: this.years }));

    return this;
  },

  initialize: function (attrs) {
    this.years = attrs.years;
  },

  events: {
    "change": "sortNotes"
  },

  sortNotes: function () {
    app.view.trigger("newSort", this.$("option:selected").val());
  }
});
