import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors({
  origin: "https://calcom-scheduling-platform.vercel.app"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Scheduling API Running.");
});

app.use("/api", eventRoutes);
app.use("/api", availabilityRoutes);
app.use("/api", bookingRoutes);
app.use("/api", slotRoutes);

// Central error handler
app.use(errorHandler);

export default app;