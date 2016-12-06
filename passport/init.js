var passport = {
  serializeUser: function (user, done) {
    done(null, user.__id);
  },

  deserializeUser: function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  }
};

module.exports = passport;
