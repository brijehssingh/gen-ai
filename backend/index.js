import app from "./src/app.js";
import env from"dotenv"
env.config();
import cookieParser from "cookie-parser";
import db from "./src/connection/dbconn.js";
import invokeai from "./src/services/aiservice.js";
app.use(cookieParser());
 
db();
 invokeai();
app.listen(process.env.PORT   , (req,res)=>{
    
console.log("Server is running on port", process.env.PORT);


})