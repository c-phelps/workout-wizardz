const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    // destructured params
    const { username, password } = req.body;
    const findUser = await User.findOne({ where: { username: username } });
    // some validation to make sure that the 
    if (findUser) {
      return res.status(400).json({ error: "Username already exists. Try logging in or select a different username!" });
    }
    if (username.length < 1) {
      return res.status(400).json({ error: "Please enter a username." });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Please enter a password that is at least 8 characters long." });
    }

    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// quick check to see if user is logged in for FE logic
router.get("/loggedIn", (req, res) => {
  if (req.session.logged_in) {
    res.json({ logged_in: true });
  } else {
    res.json({ logged_in: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password, please try again" });
      return;
    }
    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// logout route hit via logout button
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
