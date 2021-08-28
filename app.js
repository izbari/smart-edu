//import section
const express = require("express");

// middlewares
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("INDEX SAYFASI");
});

const port = 3000;

app.listen(port, () => {
  console.log("Server is started at", port + ". port");
});
