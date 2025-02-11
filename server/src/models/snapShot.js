import mongoose from "mongoose";

const ScreenshotSchema = new mongoose.Schema({
    imageUrl: String,
    timestamp: { type: Date, default: Date.now }
});

const SnapShot = mongoose.model("SnapShot", ScreenshotSchema);

export { SnapShot };