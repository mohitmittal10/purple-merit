import express from "express";
import cors from "cors";
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: [
    "https://purple-merit-yb3c-q70jrgxgl-mohit-mittals-projects-69a05702.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));