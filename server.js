// CPhelps require our node packages
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require("dotenv").config();

// require our routes/connection and helpers
const routes = require("./controllers");
const sequelize = require("./config/connections");
const helpers = require("./utils/helpers");

// initialize the app and set the port
const app = express();
const PORT = process.env.PORT || 3001;

// set the session variables
const sess = {
  secret: process.env.SECRET,
  // cookie set for a day
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, 
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// initialise our app to use our session that we defined above
app.use(session(sess));

// initialize and store handlebars in a variable
const hbs = exphbs.create({ helpers });

// set Handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// direct to modular routing
app.use(routes);

// do not force sync
sequelize.sync({ force: false }).then(() => {
  // log that the server is live
  app.listen(PORT, () =>
    console.log(`\nServer running on port ${PORT}. Visit http://localhost:${PORT} and get started with Workout Wizard!`)
  );
});
