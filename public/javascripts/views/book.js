var book = Handlebars.templates.book;

var BookView = Backbone.View.extend({
  tagName: "li",

  className: "cf",

  template: book,

  events: {
    "mouseenter": "toggleActions",
    "mouseleave": "toggleActions",
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
    var bookId = $(e.currentTarget).data("id");
    var self = this;
    $.ajax({
      url: "/books/" + bookId,
      method: "delete",
      complete: function (data) {
        self.model.destroy();
        self.remove();
      }
    });
  },

  toggleActions: function () {
    var $actionButtons = this.$("input[type='button']");
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
