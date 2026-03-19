import { Router } from "express";
import {register , login, logout, getuser } from "../controllers/authcontroller.js";
import { authmiddleware } from "../middlewares/authmiddleware.js";

const authrouter = Router(); 

 
authrouter.post("/register" , register )
authrouter.post("/login" , login)
authrouter.get("/logout" , logout) 
authrouter.get("/getuser" , authmiddleware , getuser );
export default authrouter;
 
 
