import mongoose from "mongoose";

const VIDEO_TYPE = {
    UPLOAD: "upload",
    RECORD: "record",
};

const uploadVideoSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "The project description is required"],
        },
        video: {
            type: String,
            required: [true, "Video Link is required"],
        },
        // Converted type field into an enum
        type: {
            type: String,
            enum: Object.values(VIDEO_TYPE),
            required: [true, "The project type is required"],
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userTask",
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
        },
    },
    { timestamps: true }
);

const uploadSingleVideo = mongoose.model("uploadVideo", uploadVideoSchema);
export { uploadSingleVideo, VIDEO_TYPE };

