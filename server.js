const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

// Static public folder
app.use(express.static(path.join(__dirname, "/public")));
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

// Specific paths
app.get("/", (req, res) => {
  res.show("index");
});

app.get("/about", (req, res) => {
  res.show("about");
});

app.get("/contact", (req, res) => {
  res.show("contact");
});

app.use((req, res) => {
  res.status(404).show("404");
});

// Listen to server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
