import express from "express";
import authrouter from "./routes/authroute.js";
import chatRoute from "./controllers/chat.js";
import resumeRoutes from "./controllers/resume.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express(); 

// ✅ Order matters
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gen-ai-pearl-two.vercel.app"
  ],
  credentials: true
}));

app.use(cookieParser());

// ✅ test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// routes
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authrouter);
app.use("/api", chatRoute);
app.use("/api", resumeRoutes);

export default app;