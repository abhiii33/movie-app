import asyncHandler from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/apiresponse.js"

 export const test = asyncHandler(async(req,res)=>{
    return  res.status(200)
               .json( new ApiResponse("ab","avvv","me",))
})

