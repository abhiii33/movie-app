import asyncHandler from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/apiresponse.js"
import {ApiError} from "../utils/error.js"

 export const test2 = asyncHandler(async(req,res,Next)=>{
    return res.status(201)
            .json("creasted")
 })