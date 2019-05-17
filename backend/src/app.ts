require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { DousuruRouter } from "./routes";
import { getDatabaseConnection } from "./db";
import { DousuruIO } from "./socket";

getDatabaseConnection().then(conn => {
  console.log("database connection created: successful?", !!conn);
});

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
DousuruIO.initializeInstance(server);
DousuruRouter.initializeInstance(app);
