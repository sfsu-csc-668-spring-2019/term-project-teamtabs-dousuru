import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
