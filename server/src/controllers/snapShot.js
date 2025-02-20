import { SnapShot } from "../models/snapShot.js";
import { userTracker } from "../models/TrackerTime.js";
import { User } from "../models/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Upload Screenshot Controller
const uploadScreenshotController = asyncHandler(async (req, res) => {
    const file = req.file;
    const userId = req.user.id;

    if (!file) {
        throw new apiError("No image file uploaded");
    }
    const checkValidUser = await User.findById(userId).select("name email");

    if (!checkValidUser) {
        throw new apiError(401, "User is not valid");
    }

    const timeTracking = await userTracker
        .findOne({
            userId,
            $and: [
                { checkIn: { $ne: null } },
                { isRunning: true },
                { isCheckedOut: false },
            ],
        })
        .populate("projectId isCheckedOut");

    if (!timeTracking) {
        throw new apiError(
            "User is not checked in or tracking time is not running."
        );
    }

    const localFilePath = file.path;
    const uploadResult = await uploadOnCloudinary(localFilePath);

    if (!uploadResult) {
        throw new apiError("Failed to upload image to Cloudinary");
    }

    const imageUrl = uploadResult.secure_url;

    const newScreenshot = await SnapShot.create({
        imageUrl,
        userId: timeTracking.userId,
        userInfo: checkValidUser,
        projectId: timeTracking.projectId._id,
    });

    res.status(200).json(
        new apiResponse(200, newScreenshot, "Image uploaded successfully")
    );
});

// Get User Screen Shot Detail
const getUserScreenShot = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { projectId } = req.query;

    if (!projectId) {
        throw new apiError(400, "Project ID is required.");
    }

    const snapshots = await SnapShot.find({ userId, projectId })
        .populate("userId", "name email")
        .populate("projectId", "projectTitle")
        .sort({ createdAt: -1 });

    if (snapshots.length === 0) {
        return res
            .status(404)
            .json(
                new apiResponse(
                    404,
                    "No Snapshots found for this project and user."
                )
            );
    }

    res.status(200).json(
        new apiResponse(200, snapshots, "User Snapshots fetched successfully.")
    );
});

// Get All Screenshots Controller
const getAllScreenshotsController = asyncHandler(async (req, res) => {
    const { projectId } = req.query;

    if (!projectId) {
        throw new apiError(400, "Project ID is required.");
    }

    const snapshots = await SnapShot.find({ projectId })
        .populate("userId", "name email")
        .populate("projectId", "projectTitle")
        .sort({ createdAt: -1 });

    if (snapshots.length === 0) {
        return res
            .status(404)
            .json(new apiResponse(404, "No Snapshots found for this project."));
    }

    res.status(200).json(
        new apiResponse(
            200,
            snapshots,
            "Snapshots for project fetched successfully."
        )
    );
});

const getUserTrackerStatus = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const userTracking = await userTracker
        .findOne({
            userId,
            $and: [{ checkIn: { $ne: null } }, { isCheckedOut: false }],
        })
        .sort({ createdAt: -1 });

    if (!userTracking) {
        throw new apiError(404, "No active time tracking found for user");
    }
    res.status(200).json(
        new apiResponse(
            200,
            userTracking,
            "User tracker status fetched successfully."
        )
    );
});

export {
    uploadScreenshotController,
    getAllScreenshotsController,
    getUserScreenShot,
    getUserTrackerStatus,
};
