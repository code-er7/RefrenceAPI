import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const newTask = async(req , res, next)=>{
      const {title , description } = req.body;
      await Task.create({
        title,
        description,
        user:req.user,
      });
      res.status(201).json({
          success:true,
          message:"Taks added Successfully"
      });
}
export const getMyTask = async(req , res)=>{
    const userId = req.user._id;
    const tasks = await Task.find({user : userId});
    res.status(200).json({
        success:true,
        tasks,
    })
}
export const updateTask = async(req , res , next)=>{
    const task = await Task.findById(req.params.id);
    if(!task)return next(new ErrorHandler("Task not found" , 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
        success:true,
        message : "Task Updated",
    })
}
export const deleteTask = async(req , res ,next)=>{
    const task = await Task.findById(req.params.id);
    if(!task)return next(new ErrorHandler("Task not found" , 404));
    await task.deleteOne();
    res.status(200).json({
        success:true,
        message : "Task Deleted",
    })
}