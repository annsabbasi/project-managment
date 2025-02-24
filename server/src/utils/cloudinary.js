/* eslint-disable no-undef */
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    let response = null;
    try {
        if (!localFilePath) return null;

        // Ensure if the file exists
        if (!fs.existsSync(localFilePath)) {
            throw new Error(`File not found ${localFilePath}`);
        }

        // Upload the file on cloudinary
        response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            type: 'upload',
            access_mode: 'public',
        });
        return response;
    } catch (error) {
        console.log("Cloudinary utils error", error);
        return null;
    } finally {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            // console.log(`File ${localFilePath} removed successfully.`);
        } else {
            console.log(`File ${localFilePath} not found, nothing to remove.`);
        }
    }
};


export const deleteFromCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
        return response;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary };
