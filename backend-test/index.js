const express = require("express");
const morgan = require("morgan");
var cors = require("cors");
const expressWsFactory = require("express-ws");

const app = express();
const expressWs = expressWsFactory(app);

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
  res.status(200);
});

app.ws("/socket", (ws, req) => {
  ws.on("message", msg => {
    console.log(msg);
    ws.send(msg);
  });
  console.log("socket connect");
});

console.log("running on port 3000");
app.listen(3000);
