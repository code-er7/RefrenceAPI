import { User } from "../models/userD.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async(req , res , next)=>{
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Please login first"
        });
    }
    const decode = jwt.verify(token , process.env.JWT_SECRET);
    req.user = await User.findById(decode._id);
    next();
}