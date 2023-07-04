import express from "express";
import { User } from "../models/userD.js";
import {    getMyprofile, loginuser, logout, registerUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";



const router = express.Router();


router.post("/login",loginuser);
router.get("/logout" ,logout);
router.post("/new", registerUser);
router.get("/me", isAuthenticated ,  getMyprofile);

export default router;