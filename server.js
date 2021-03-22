// ================
// Exports
// ================

const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("express-handlebars");
const path = require("path");

const port = 8000;
const app = express();

// ================
// Middleware
// ================

// Static public folder
app.use(express.static(path.join(__dirname, "/public")));

// Static favicon
app.use(favicon(path.join(__dirname, "/public", "favicon.ico")));

// Static font-awesome lib
app.use(
  express.static(
    path.join(__dirname + "/node_modules/@fortawesome/fontawesome-free/js")
  )
);

// Post request
app.use(express.urlencoded({ extended: false }));

// ================
// Handlebars
// ================

// Handlebars Setup
app.engine("hbs", hbs({ extname: "hbs" }));
app.set("view engine", "hbs");

// Home Layout
app.get("/", (req, res) => {
  res.render("index", { layout: "home" });
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "home" });
});

app.get("/register", (req, res) => {
  res.render("register", { layout: "home" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { layout: "home" });
});

app.post("/contact/send-message", (req, res) => {
  const { author, sender, title, message, screen } = req.body;

  if (author && sender && title && message && screen) {
    res.render("contact", {
      layout: "home",
      isSent: true,
      fileName: screen,
    });
  } else {
    res.render("contact", { layout: "home", isError: true });
  }
});

// Main Layout
app.get("/:username/playlists", (req, res) => {
  res.render("playlists");
});

app.get("/:username/artists", (req, res) => {
  res.render("artists");
});

app.get("/:username/albums", (req, res) => {
  res.render("albums");
});

app.use((req, res) => {
  res.status(404).render("404");
});

// ================
// Start server
// ================

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
