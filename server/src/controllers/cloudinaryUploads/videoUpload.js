import mongoose from "mongoose";
import { uploadSingleVideo, VIDEO_TYPE } from "../../models/Video_SubTask/uploadSingleVideo.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

/**
 * Common function to handle video upload logic
 */
const uploadVideo = async (file) => {
    if (!file) {
        throw new apiError("No video file uploaded");
    }

    if (file.size > 100 * 1024 * 1024) {
        throw new apiError("Video size is greater than 100MB");
    }

    const localFilePath = file.path;
    const uploadResult = await uploadOnCloudinary(localFilePath);

    if (!uploadResult) {
        throw new apiError("Failed to upload video to Cloudinary");
    }

    return uploadResult.url;
};

/**
 * Controller for uploading videos (both record & upload)
 */
const uploadVideoController = asyncHandler(async (req, res) => {
    const file = req.file;
    const { description, type } = req.body;

    if (!description) {
        throw new apiError("Video description not provided");
    }

    if (!Object.values(VIDEO_TYPE).includes(type)) {
        throw new apiError("Invalid video type");
    }

    const videoUrl = await uploadVideo(file);

    const newVideoSubTask = await uploadSingleVideo.create({
        description,
        video: videoUrl,
        type,
    });

    res.status(200).json(new apiResponse(200, newVideoSubTask, "Video uploaded successfully"));
});

/**
 * Get all videos
 */
const getAllVideoController = asyncHandler(async (req, res) => {
    const videosData = await uploadSingleVideo.find({});
    res.status(200).json(new apiResponse(200, videosData, "Uploaded data successfully fetched"));
});

/**
 * Get a single uploaded video
 */
const getSingleUploadVideoController = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid Video ID format");
    }

    const getVideo = await uploadSingleVideo.findOne({ _id: videoId });

    if (!getVideo) {
        throw new apiError("No uploaded video found!");
    }

    res.status(200).json(new apiResponse(200, getVideo, "Uploaded video fetched successfully!"));
});

/**
 * Get a single recorded video
 */
const getSingleRecordVideoController = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid Video ID format");
    }

    const getVideo = await uploadSingleVideo.findOne({ _id: videoId, type: VIDEO_TYPE.RECORD });

    if (!getVideo) {
        throw new apiError("No recorded video found!");
    }

    res.status(200).json(new apiResponse(200, getVideo, "Recorded video fetched successfully!"));
});

export {
    uploadVideoController,
    getAllVideoController,
    getSingleUploadVideoController,
    getSingleRecordVideoController,
};