import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/error.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import generateTokens from "../utils/tokenGenerator.js";
import { ApiResponse } from "../utils/apiresponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

export const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password, fullName} = req.body;
  if (!username || !email || !password || !fullName) {
    return res.status(404).json(new ApiError("fill form complete"));
  }
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res
      .status(400)
      .json(new ApiError("User already exists with this email"));
  } 
   
  const avatarLocalPath = req.files?.avatar[0]?.path;
  
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
  
  const user = await User.create({
    username,
    email,
     avatar: avatar.url,
        coverImage: coverImage?.url || "",
    password,
    fullName,
  });
  const registeredUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    registeredUser,
  });
});

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(404).json(new ApiError("fill form complete"));
  }
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    return res.status(404).json(new ApiError("User not found"));
  }
  // const {password} =req.body
  const passwordValid = user.isPasswordCorrect(password);
  if (!passwordValid) {
    return res.status(400).json(new ApiError("Incorrect password"));
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);
  const logeddUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "User logged in successfully",
      logeddUser,
    });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json(new ApiError("Please login again"));
  }
  const decodedToken = jwt.verify(refreshToken, "fvd");
  if (!decodedToken) {
    return res.status(403).json(new ApiError("Invalid refresh token"));
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(404).json(new ApiError("User not found"));
  }
  if (user.refreshToken !== refreshToken) {
    return res.status(403).json(new ApiError("Invalid refresh token"));
  }
  const { accessToken, refreshToken: newRefresToken } =
    await generateAccessToken(user._id);
  if (!accessToken) {
    return res
      .status(500)
      .json(new ApiError("Failed to generate new access token"));
  }
  return res
    .status(200)
    .cookies("accessToken", accessToken)
    .cookie("refreshToken", newRefresToken)
    .json({
      success: true,
      message: "New access token generated successfully",
      user,
    });
});

export const userLogout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshToken: null,
    },
  });
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse("User logged out successfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, "current user"));
});

export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const user = await User.findById(req.user?._id);
  if (!user) return;
  const valid = user.isPasswordCorrect(oldPassword);
  if (!valid) return res.status(401).json(new ApiError("error"));
  user.password = newPassword;
  await user.save();
  return res.status(201).json(new ApiResponse("done", user));
});

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { email, username, fullName } = req.body;
  if (!email || !username || !fullName)
    return res.status(401).json(new ApiError("fill completely", 401));
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName: fullName,
        email: email,
        username: username,
      },
    },
    { new: true }
  );
  await user.save();
  return res.status(200).json(new ApiResponse("updates", 201, user));
});

export const deleteAccoumt = asyncHandler(async (req, res) => {
  const user = await User.findByIdandDelete(req.user._id);
  if (!user) return res.status(404).json(new ApiError("User not found"));
  return res
    .status(200)
    .json(new ApiResponse("Account deleted successfully", 200, user));
});

export const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json(new ApiError("Username is required"));
  }
  const channel = await User.aggregate([
    {
      $match: {
        username: username,
      },
    },
    {
      $lookup: {
        model: Subscription,
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        model: Subscription,
        localField: "_id",
        foreignField: "subscriber",
        as: "MYsubscriptions",
      },
    },
    {
      $addFields: {
        subscriberCount: { $size: "$subscribers" },
        subscriptionCount: { $size: "$MYsubscriptions" },
      },
    },
    {
      $project: {
        username: 1,
        subscriberCount: 1,
        subscriptionCount: 1,
        fullName: 1,
        avatar: 1,
      },
    },
  ]);
  if (!channel || channeluser.length === 0) {
    return res.status(404).json(new ApiError("User not found"));
  }
  return res.status(200).json(new ApiResponse(200, channel[0], "user channel"));
});

export const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "videoswatched",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "videocreatordetails",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    fullName: 1,
                  },
                },
              ],
            },
          },
          {
            $project: {
              videoswatched: 1,
              title: 1,
              description: 1,
            },
          },
        ],
      },
    },
  ]);
  return res.status.json(new ApiResponse(200, user[0], "watchhistory "));
});
