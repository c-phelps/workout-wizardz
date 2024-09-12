const router = require("express").Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      boolHomepage: true,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // if (req.session.logged_in) {
  //   // res.redirect("api/workout");
  //   return;
  // }
  res.render("login");
});

module.exports = router;
