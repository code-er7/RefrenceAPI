import { User } from "../models/userD.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const loginuser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Username of password " , 400));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Invalid user name of password" , 400));
    sendCookie(user, res, `Welcome Back  , ${user.name}`, 200);

}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(404).json({
        success: false,
        message: "user already exist "
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "Registered Succesfully", 201);
}

export const getMyprofile = async (req, res) => {
    res.status(200).json({
        success:true,
        user:req.user
    })
}
export const logout = async(req , res )=>{
    res.status(200)
    .cookie("token" , null , { 
        expires: new Date(Date.now()), 
        sameSite : process.env.NODE_ENV === "Developement"?"lax": "none",
        secure : process.env.NODE_ENV === "Developement"?false : true
    }).json({
        success:true,
        message:"Logout Succesfull" 
    })
}