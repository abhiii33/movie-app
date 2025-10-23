import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/error.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { Video } from "../models/video.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const publishVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  console.log("📝 Received request body:", { title, description });

  // Validate title and description
  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  // Check if files exist
  console.log("📂 Received files:", req.files ? Object.keys(req.files) : "No files");

  if (!req.files || !req.files.video || req.files.video.length === 0) {
    throw new ApiError(400, "Video file is required");
  }

  if (!req.files || !req.files.thumbnail || req.files.thumbnail.length === 0) {
    throw new ApiError(400, "Thumbnail is required");
  }

  // Get local file paths
  const videoFileLocal = req.files.video[0].path;
  const thumbnailFileLocal = req.files.thumbnail[0].path;

  console.log("📁 Video file path:", videoFileLocal);
  console.log("📁 Video filename:", req.files.video[0].originalname);
  console.log("📁 Thumbnail file path:", thumbnailFileLocal);
  console.log("📁 Thumbnail filename:", req.files.thumbnail[0].originalname);

  // Validate file types
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  const videoExt = videoFileLocal.toLowerCase().slice(-4);
  const thumbnailExt = thumbnailFileLocal.toLowerCase().slice(-4);

  if (!videoExtensions.some(ext => videoFileLocal.toLowerCase().endsWith(ext))) {
    throw new ApiError(400, `Invalid video file format. Received: ${videoFileLocal}`);
  }

  if (!imageExtensions.some(ext => thumbnailFileLocal.toLowerCase().endsWith(ext))) {
    throw new ApiError(400, `Invalid thumbnail format. Must be an image file (jpg, png, etc.). Received: ${thumbnailFileLocal}`);
  }

  // Upload thumbnail first (smaller file, faster)
  console.log("\n⏳ Uploading thumbnail to Cloudinary...");
  const uploadedThumbnail = await uploadOnCloudinary(thumbnailFileLocal, "image");

  if (!uploadedThumbnail || !uploadedThumbnail.url) {
    throw new ApiError(
      500,
      "Failed to upload thumbnail to cloudinary. Check cloudinary config and logs above."
    );
  }

  console.log("✅ Thumbnail upload completed successfully");

  // Upload video
  console.log("\n⏳ Uploading video to Cloudinary...");
  const uploadedVideoFile = await uploadOnCloudinary(videoFileLocal, "video");

  // Validate video upload
  if (!uploadedVideoFile) {
    console.error("❌ uploadedVideoFile is null/undefined");
    throw new ApiError(
      500,
      "Failed to upload video file to cloudinary. Check cloudinary config and file size. See logs above for details."
    );
  }

  if (!uploadedVideoFile.url && !uploadedVideoFile.secure_url) {
    console.error("❌ uploadedVideoFile response:", uploadedVideoFile);
    throw new ApiError(
      500,
      "Video uploaded but URL is missing. Check cloudinary response."
    );
  }

  console.log("✅ Video upload completed successfully");

  const videoUrl = uploadedVideoFile.secure_url || uploadedVideoFile.url;
  const thumbnailUrl = uploadedThumbnail.secure_url || uploadedThumbnail.url;

  console.log("\n📊 Creating video document in database...");
  console.log("   - Video URL:", videoUrl);
  console.log("   - Thumbnail URL:", thumbnailUrl);
  console.log("   - Duration:", uploadedVideoFile.duration || 0);

  // Create video document
  const video = await Video.create({
    title,
    description,
    videoFile: videoUrl,
    thumbnail: thumbnailUrl,
    duration: uploadedVideoFile.duration || 0,
    owner: req.user._id,
  });

  if (!video) {
    throw new ApiError(500, "Failed to create video in database");
  }

  console.log("✅ Video document created successfully");
  console.log("   - Video ID:", video._id);

  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video uploaded successfully"));
});

export const getAllVideos = asyncHandler(async (req, res) =>{
          const id = req.user._id
          const videos = await Video.find({owner:id})
           if(!videos)
              throw new ApiError (404, "No Videos");
            return res.status(200).json (new ApiResponse (200, videos, "Videos fetched successfully"));
})

export const getVideoById = asyncHandler(async (req, res) =>{
    const {id}= req.params;
    const video = await Video.findById(id);
    if(!video){
        throw new ApiError (404, "Video not found");
    }   
    return res.status(200).json (new ApiResponse (200, video, "Video fetched successfully"));
})

export const updateVideo = asyncHandler(async (req, res) =>{
    const {id}= req.params;
    const {title,description}= req.body;
    const video = await Video.findByIdAndUpdate(
        id,
        {title, description},
        {new: true}     
    )
    if(!video){
        throw new ApiError (404, "Video not found");
    }   
    return res.status(200).json (new ApiResponse (200, video, "Video updated successfully"));
})

export const deleteVideo = asyncHandler(async (req, res) =>{
    const {id}= req.params;
    const video = await Video.findByIdAndDelete(id);    
    if(!video){
        throw new ApiError (404, "Video not found");
    }   
    return res.status(200).json (new ApiResponse (200, null, "Video deleted successfully"));
})

export const togglePublicationStatus = asyncHandler(async (req, res) =>{
    const {id}= req.params;
    const video = await Video.findById(id);
    if(!video){
        throw new ApiError (404, "Video not found");    

    }
    video.isPublished = !video.isPublished;
    await video.save();
    return res.status(200).json (new ApiResponse (200, video, "Video publication status toggled successfully"));
})