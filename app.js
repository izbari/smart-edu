//import section
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const app = express();
//CONNECT DB
mongoose
  .connect("mongodb://localhost/smartedu-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  })
  .then(() => {
    console.log("DB connected successfully!");
  });

//template engine
app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extend: true}));




app.get("/about", pageRoute);

app.get("/login", pageRoute);
app.use("/courses", courseRoute);
app.get("/dashboard", pageRoute);
app.get("/register", pageRoute);

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
