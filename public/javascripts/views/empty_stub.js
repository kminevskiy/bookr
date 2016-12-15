var emptyStub = Handlebars.templates.empty_stub;

var EmptyStubView = Backbone.View.extend({

  attributes: {
    id: "empty-stub"
  },

  template: emptyStub,

  render: function () {
    this.$el.html(this.template(this.page));

    return this;
  },

  initialize: function (attrs) {
    this.page = attrs;
    this.listenTo(this, "destroyEmptyStub", this.remove);
  }
});
