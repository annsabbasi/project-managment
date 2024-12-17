import mongoose from 'mongoose';

const videoSubtaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "The project title is required"],
        maxlength: [40, "The title should be no longer than 40 characters"]
    },
    video: {
        type: String,
        required: [true, "Docs Link is required"]
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userTask",
        required: true
    }
}, { timestamps: true });



const videoSubTask = mongoose.model('video_Subtask', videoSubtaskSchema);
export { videoSubTask };