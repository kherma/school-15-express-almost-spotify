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

// ================
// Handlebars
// ================

// Handlebars Setup
app.engine(".hbs", hbs());
app.set("view engine", ".hbs");

// Handlebars paths
app.get("/", (req, res) => {
  res.render("index", { layout: false });
});

app.get("/hello/:name", (req, res) => {
  res.render("hello", { layout: false, name: req.params.name });
});

app.get("/playlists", (req, res) => {
  res.render("playlists", { layout: false });
});

app.get("/artists", (req, res) => {
  res.render("artists", { layout: false });
});

app.get("/albums", (req, res) => {
  res.render("albums", { layout: false });
});

app.use((req, res) => {
  res.status(404).render("404", { layout: false });
});

// ================
// Start server
// ================

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
