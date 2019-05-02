require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import { getDatabaseConnection } from "./db";
import { createServer } from "http";
import { DousuruIO } from "./socket";

getDatabaseConnection().then(conn => {
  console.log("database connection created: successful?", !!conn);
});

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
DousuruIO.initializeInstance(createServer(app));
