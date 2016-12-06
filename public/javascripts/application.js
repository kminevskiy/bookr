var app = {
  bindEvents: function () {
    _.extend(this, Backbone.Events);
    this.on("goHome", this.updateUrlToHome);
  },

  updateUrlToHome() {
    Backbone.history.navigate("/", true);
  },

  init: function () {
    this.menu = new MenuView();
    this.bindEvents();
  },

  newBookForm: function () {
    this.new_book = new NewBookView();
  },

  indexView: function () {
    Backbone.history.navigate("/", {})
    if (this.new_book) {
      this.new_book.remove();
    }
    this.books = new Books();
  }
}
