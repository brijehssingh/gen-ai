import mongoose  from "mongoose";
import env from"dotenv"
env.config();
 export default async function db() {
    
    try {
        await mongoose.connect(process.env.connection_string)
        console.log("db connected");
        
    } catch (error) {
        console.log(error.message);
        
    }
}


