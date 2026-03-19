import app from "./src/app.js";
import env from"dotenv"
env.config();
import cors from "cors"
import cookieParser from "cookie-parser";
import db from "./src/connection/dbconn.js";
import invokeai from "./src/services/aiservice.js";
app.use(cookieParser());
 
db();

app.use(cors({
  origin: "https://gen-ai-pearl-two.vercel.app",
  credentials: true
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

