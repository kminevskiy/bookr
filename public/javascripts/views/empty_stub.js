var emptyStub = Handlebars.templates.empty_stub;

var EmptyStubView = Backbone.View.extend({

  attributes: {
    id: "empty-stub"
  },

  template: emptyStub,

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  initialize: function () {
    this.listenTo(this, "destroyEmptyStub", this.remove);
  }
});
