import mongoose from "mongoose";

const uploadVideo = new mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "The project description is required"],
        },
        video: {
            type: String,
            required: [true, "Video Link is required"],
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userTask",
        },
    },
    { timestamps: true }
);

const uploadSingleVideo = mongoose.model("uploadVideo", uploadVideo);
export { uploadSingleVideo };
