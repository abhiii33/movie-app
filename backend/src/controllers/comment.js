import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/error.js"
import {ApiResponse} from "../utils/apiresponse.js"
import {Comment} from "../models/comment.js"
import {Video} from "../models/video.js"

 export const getAllcomments = asyncHandler(async(req,res)=>{
            const{videoId} = req.params
            const comment = await Comment.find({videoId})
            return res.status(200).json(new ApiResponse(200,"comments",comment))
 })
 export const addComment = asyncHandler(async(req,res)=>{
             const {content} = req.body
             const{videoId} = req.params
             const video = await Video.findById(videoId)
             const comment= await Comment.create({
                content:content,
                video:video,
                owner:req.user._id
             })
             return res.status(200).json(new ApiResponse(200,"comments",comment))
 })

 export const updateComment = asyncHandler(async(req,res)=>{
         const{content}= req.body
         const updatedcomment = await Comment.findByIdAndUpdate(req.user._id,{
            $set:{
             content:content
            }}
         )
         return res.status(200).json(new ApiResponse(200,"updated",updatedcomment))
 })

 export const deleteComment = asyncHandler(async(req,res)=>{
   const deletedComment = await Comment.findByIdAndDelete(req.user._id)
   return res.status(200).json(new ApiResponse(200,"deleted",deletedComment))
 })