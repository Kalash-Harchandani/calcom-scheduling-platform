import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Scheduling API Running.");
});

app.use("/api", eventRoutes);
app.use("/api", availabilityRoutes);
app.use("/api", bookingRoutes);

// Central error handler
app.use(errorHandler);

export default app;