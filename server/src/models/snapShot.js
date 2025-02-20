import mongoose from "mongoose";

const ScreenshotSchema = new mongoose.Schema(
    {
        imageUrl: String,
        // trackerId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "TimeTracking",
        //     required: true
        // },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserInfo",
            required: true,
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userTask",
            required: true,
        },
        userInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserInfo",
            required: true,
        },
    },
    { timestamps: true }
);

const SnapShot = mongoose.model("SnapShot", ScreenshotSchema);

export { SnapShot };
