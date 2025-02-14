import { SnapShot } from "../models/snapShot.js";
import { userTracker } from "../models/TrackerTime.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



// Upload Screenshot Controller
const uploadScreenshotController = asyncHandler(async (req, res) => {
    const file = req.file;
    const userId = req.user.id

    if (!file) {
        throw new apiError("No image file uploaded");
    }

    console.log("userId", userId)
    const timeTracking = await userTracker.findOne({
        userId,
        $or: [{ checkIn: { $ne: null } }, { isRunning: true }]
    }).populate("projectId")
    if (!timeTracking) {
        throw new apiError("User is not checked in or tracking time is not running.");
    }

    const localFilePath = file.path;  // This points to /public/temp/filename
    const uploadResult = await uploadOnCloudinary(localFilePath);

    if (!uploadResult) {
        throw new apiError("Failed to upload image to Cloudinary");
    }

    const imageUrl = uploadResult.secure_url;

    const newScreenshot = await SnapShot.create({
        imageUrl,
        userId: timeTracking.userId,
        projectId: timeTracking.projectId._id
    });

    res.status(200).json(
        new apiResponse(200, newScreenshot, "Image uploaded successfully")
    );
});

// Get All Screenshots Controller
const getAllScreenshotsController = asyncHandler(async (req, res) => {
    const screenshots = await SnapShot.find().sort({ createdAt: -1 });

    if (!screenshots.length) {
        return res.status(200).json(new apiResponse(200, [], "No screenshots found"));
    }

    res.status(200).json(new apiResponse(200, screenshots, "Screenshots fetched successfully"));
});





// Upload Screenshot Controller
// const uploadScreenshotController = asyncHandler(async (req, res) => {
//     const file = req.file;

//     if (!file) {
//         throw new apiError("No image file uploaded");
//     }

//     const localFilePath = file.path;
//     const uploadResult = await uploadOnCloudinary(localFilePath);

//     if (!uploadResult) {
//         throw new apiError("Failed to upload image to Cloudinary");
//     }

//     const imageUrl = uploadResult.secure_url;

//     const newScreenshot = await SnapShot.create({
//         imageUrl
//     });

//     res.status(200).json(
//         new apiResponse(200, newScreenshot, "Image uploaded successfully")
//     );
// });

// // Get All Screenshots Controller
// const getAllScreenshotsController = asyncHandler(async (req, res) => {
//     const screenshots = await SnapShot.find().sort({ createdAt: -1 });

//     if (!screenshots.length) {
//         return res.status(200).json(new apiResponse(200, [], "No screenshots found"));
//     }

//     res.status(200).json(new apiResponse(200, screenshots, "Screenshots fetched successfully"));
// });

export { uploadScreenshotController, getAllScreenshotsController };



// const uploadScreenshotController = asyncHandler(async (req, res) => {
//     const file = req.file;
//     // const userId = req.user.id;
//     const userTrackerId = req.body;
//     // console.log("UserId (upload Screen Shot Controller)", userId)
//     console.log("UserTrackerId (upload Screen Shot Controller)", userTrackerId)

//     // if (!userId) {
//     //     throw new apiError("User is not valid")
//     // }
//     if (!file) {
//         throw new apiError("No image file uploaded");
//     }
//     const today = moment().format('YYYY-MM-DD')
//     const userCheckInStatus = await userTracker.findOne({ userTrackerId, date: today, isRunning: true })
//     console.log("userCheckInStatus (upload Screen Shot Controller)", userCheckInStatus)

//     if (!userCheckInStatus) {
//         throw new apiError(402, "You are not checkedIn. Snap Shots are paused")
//     }

//     const localFilePath = file.path;  // This points to /public/temp/filename
//     const uploadResult = await uploadOnCloudinary(localFilePath);

//     if (!uploadResult) {
//         throw new apiError("Failed to upload image to Cloudinary");
//     }

//     console.log("uploadResult snapShot Controller", uploadResult);
//     const imageUrl = uploadResult.secure_url;

//     const newScreenshot = await SnapShot.create({
//         imageUrl,
//         // userId,
//         userTrackerId: userCheckInStatus.projectId,
//     });
//     console.log("NewScreenShot (uploadScreenShot Controller.js)", newScreenshot)
//     res.status(200).json(
//         new apiResponse(200, newScreenshot, "Image uploaded successfully")
//     );
// });