
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/dbConfig.js";
import userrouter from "./router/stu_mentor.routers.js";
const app = express();
dotenv.config()
const port= process.env.PORT

app.use(cors())
connectDB();
app.use((express.json()))
app.use('/api',userrouter)
app.listen(port,()=>{
 console.log("my app is listening",port);
})
