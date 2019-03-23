const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
  res.status(200);
});

console.log("running on port 3000");
app.listen(3000);
