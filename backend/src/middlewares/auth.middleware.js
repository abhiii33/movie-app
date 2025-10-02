import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/error.js"
import {User} from "../models/user.js"
import jwt from "jsonwebtoken"


export const auth = asyncHandler(async(req,res,next)=>{
     try {
          const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "")
          if (token) console.log("got the token",token);
          
          if(!token) 
           return res.status(401).json(new ApiError("aunathorized"))
       const verify = jwt.verify(token,"as")
      //  console.log("ver",verify);
       
       const user = await User.findById(verify.id)
       if(!user) 
           return res.status(404).json(new ApiError("User not found"))
        req.user = user
       next()
     } catch (error) {
        res.status(401).json(new ApiError("invalid token "))
     }
})