import express from "express";
import userRoutes from "./user";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("hello");
});

router.use("/users", userRoutes);

export default router;
