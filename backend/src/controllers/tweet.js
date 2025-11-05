import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.js"
import {User} from "../models/user.js"
import { ApiError } from "../utils/error.js";
import { ApiResponse } from "../utils/apiresponse.js";
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
        const {content} = req.body;
        if(!content){
            throw new ApiError(400, "Content is required")
        }
        const tweet = new Tweet({
            content,
            owner: req.user._id 
        });
        await tweet.save();
        res.status(201).json(new ApiResponse(201, "Tweet created successfully", tweet));    
})

const getUserTweets = asyncHandler(async (req, res) => {
 const userId = req.params.userId;
 if(!isValidObjectId(userId)){
    throw new ApiError(400, "Invalid user id")
 }
 const user = await User.findById(userId);
 if(!user){
    throw new ApiError(404, "User not found")
 }
    const tweets =  await Tweet.find({owner: userId})
    res.status(200).json(new ApiResponse(200, "User tweets fetched successfully", tweets));
})

const updateTweet = asyncHandler(async (req, res) => {
    const tweetId = req.params.tweetId;
    const {content} = req.body;     
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet id")
    }
    const tweet = await Tweet.findById(tweetId);
    if(!tweet){
        throw new ApiError(404, "Tweet not found")
    }   
    if(tweet.owner.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You are not authorized to update this tweet")
    }
    if(content){
        tweet.content = content;
    }
    await tweet.save();
    res.status(200).json(new ApiResponse(200, "Tweet updated successfully", tweet));
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}