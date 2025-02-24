import mongoose from "mongoose";
import { uploadSingleVideo } from "../../models/Video_SubTask/uploadSingleVideo.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const uploadVideoController = asyncHandler(async (req, res) => {
    const file = req.file;
    const { description } = req.body;

    if (!description) {
        throw new apiError("Video description not provided");
    }
    if (!file) {
        throw new apiError("No video file uploaded");
    }

    if (file.size > 100 * 1024 * 1024) {
        throw new apiError("Video is size is greater then 100MB");
    }

    // upload the file on cloudinary
    const localFilePath = file.path;
    const uploadResult = await uploadOnCloudinary(localFilePath);

    if (!uploadResult) {
        throw new apiError("Failed to upload video to Cloudinary");
    }

    console.log("videoUrl of the videoUpload Controller.js", uploadResult);
    const videoUrl = uploadResult.url;
    console.log("PDF URL:", videoUrl);


    const newVideoSubTask = await uploadSingleVideo.create({
        description,
        video: videoUrl,
    });
    res.status(200).json(
        new apiResponse(200, newVideoSubTask, "Video uploaded successfully")
    );
});

const getAllVideoController = asyncHandler(async (req, res) => {
    const videosData = await uploadSingleVideo.find({});
    if (!videosData) {
        new apiResponse(201, "upload any data to show up here");
    }
    res.status(200).json(
        new apiResponse(200, videosData, "uploaded data successfully fetched")
    );
});

const getSingleVideoController = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!mongoose.isValidObjectId(videoId)) {
        throw new apiError(400, "Invalid Task ID format");
    }
    const getVideo = await uploadSingleVideo.findById(videoId);
    if (!getVideo) {
        throw new apiError("No video Found!");
    }

    res.status(200).json(
        new apiResponse(200, getVideo, "Video Get Successfully!")
    );
});



export {
    uploadVideoController,
    getAllVideoController,
    getSingleVideoController,
};
