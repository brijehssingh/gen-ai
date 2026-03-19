import express from "express"
import authrouter from "./routes/authroute.js";
import chatRoute from "./controllers/chat.js"
import resumeRoutes from "./controllers/resume.js"
 import cookieParser from "cookie-parser";
const app = express(); 
import cors from "cors"
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth" , authrouter)

app.use("/api", chatRoute)

app.use("/api", resumeRoutes);



   
export default app;
