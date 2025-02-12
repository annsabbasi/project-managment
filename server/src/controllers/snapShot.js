import { SnapShot } from "../models/snapShot.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



// Upload Screenshot Controller
const uploadScreenshotController = asyncHandler(async (req, res) => {
    const file = req.file;

    if (!file) {
        throw new apiError("No image file uploaded");
    }

    const localFilePath = file.path;  // This points to /public/temp/filename
    const uploadResult = await uploadOnCloudinary(localFilePath);

    if (!uploadResult) {
        throw new apiError("Failed to upload image to Cloudinary");
    }

    console.log("uploadResult snapShot Controller", uploadResult)
    const imageUrl = uploadResult.secure_url;

    const newScreenshot = await SnapShot.create({
        imageUrl
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
