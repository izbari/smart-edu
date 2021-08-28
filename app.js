//import section
const express = require("express");
const ejs = require("ejs");

const pageRoute = require("./routes/pageRoute");

const app = express();

//template engine
app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));

app.get("/about", pageRoute);

app.get("/login", pageRoute);

app.get("/", pageRoute);

app.get("/index", (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
});

app.get("/contact", (req, res) => {
  res.status(200).render("contact", { page_name: "contact" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is started at ${port} port`);
});
