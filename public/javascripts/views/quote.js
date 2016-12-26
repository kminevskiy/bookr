var quote = Handlebars.templates.quote;

var QuoteView = Backbone.View.extend({
  tagName: "li",

  className: "cf",

  template: quote,

  events: {
    "click .delete-quote": "deleteQuote",
    "click .edit-quote": function () {
      this.editQuote();
    }
  },

  editQuote: function () {
    new QuoteEditModal({
      model: this.model
    });
  },

  deleteQuote: function () {
    this.model.destroy();
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  }

});
