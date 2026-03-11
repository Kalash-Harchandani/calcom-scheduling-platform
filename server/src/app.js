import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
// Central error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Scheduling API Running.");
});

app.use("/api", eventRoutes);



export default app;