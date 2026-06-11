import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import router from "./routes/auth.routes.js";
import rankRouter from "./routes/rank.routes.js";
import analysisRouter from "./routes/analysis.routes.js";
import { startRankTrackingCron } from "./cron/rankTrackingCron.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running"));

app.use("/api/auth", router)
app.use("/api/rank", rankRouter)
app.use("/api/analysis", analysisRouter)

//Start cron jobs
startRankTrackingCron();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.log("Server startup failed:", error);
  }
};

startServer();