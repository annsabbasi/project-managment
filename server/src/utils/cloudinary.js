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
        });

        // console.log("File is uploaded on cloudinary:", response.url);

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

export { uploadOnCloudinary };
