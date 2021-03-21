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

// Path middleware
app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}.html`));
  };
  next();
});

// ================
// Handlebars
// ================

// Handlebars Setup
app.engine(".hbs", hbs());
app.set("view engine", ".hbs");

// Handlebars paths
app.get("/hello/:name", (req, res) => {
  res.render("hello", { layout: false, name: req.params.name });
});

// ================
// Static paths
// ================

app.get("/", (req, res) => {
  res.show("index");
});

app.get("/playlists", (req, res) => {
  res.show("playlists");
});

app.get("/artists", (req, res) => {
  res.show("artists");
});

app.get("/albums", (req, res) => {
  res.show("ablums");
});

app.use((req, res) => {
  res.status(404).show("404");
});

// ================
// Start server
// ================

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
