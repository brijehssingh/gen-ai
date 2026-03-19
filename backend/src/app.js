import express from "express"
import authrouter from "./routes/authroute.js";

import cookieParser from "cookie-parser";
const app = express(); 
import cors from "cors"
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth" , authrouter)





   
export default app;
