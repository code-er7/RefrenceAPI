import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();
app.use(cookieParser());


config({
    path:"./data/config.env"
});
//using middleware 
app.use(express.json());
// custom url 
app.use("/api/v1/users" ,userRouter);
app.use("/api/v1/task" ,taskRouter);
