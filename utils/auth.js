const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};
const isLoggedIn = (req, res, next) => {
  if (req.session.logged_in) {
    return true;
  } else {
    return false;
  }
};

module.exports = { withAuth, isLoggedIn };
