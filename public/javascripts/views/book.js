var book = Handlebars.templates.book;

var BookView = Backbone.View.extend({
  tagName: "li",

  className: "cf",

  template: book,

  events: {
    "click .delete-book": "deleteBook",
    "click .details-book": function () {
      this.openDetails();
      this.scrollToModal();
    },
    "click .edit-book": function () {
      this.editBook();
      this.scrollToModal();
    }
  },

  scrollToModal: function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
  },

  openDetails: function () {
    var offsetTop = this.$el[0].offsetTop;
    new BookDetailsView({
      model: this.model,
      offset: offsetTop
    });
  },

  editBook: function () {
    var offsetTop = this.$el[0].offsetTop;
    new ModalView({
      model: this.model,
      offset: offsetTop
    });
  },

  deleteBook: function (e) {
    this.model.destroy();
    this.remove();
  },

  toggleActions: function () {
    var $actionButtons = this.$(".actions");
    $actionButtons.fadeToggle(500);
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.attr("data-id", this.model.get("id"));

    return this;
  }
});
