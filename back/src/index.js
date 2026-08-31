import express from "express";
import mongoose from "mongoose";
import dns from "node:dns";
import cors from "cors";
import { categoryRouter } from "./routes/category.js";
import { foodRouter } from "./routes/food.js";
import { orderRouter } from "./routes/order.js";
import { userRouter } from "./routes/user.js";
import "dotenv/config";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const port = 8000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected"));
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
