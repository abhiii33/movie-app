import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/error.js"
import {ApiResponse} from "../utils/apiresponse.js"
import {Comment} from "../models/comment.js"
import {Video} from "../models/video.js"

export const publishVideo = asyncHandler((req,res)=>{
    
    const{videoFile} = req.files;
})