import mongoose from 'mongoose';

const subUsertaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "The project title is required"],
        maxlength: [40, "The title should be no longer than 40 characters"]
    },
    assign: {
        type: [String],
        required: [true, "Please type the name of the admin"]
    },
    description: {
        type: String,
        maxLength: [700, "The Description should be no longer than 700 characters"]
    },
    dueDate: {
        type: Date,
        required: [true, 'The Due Date is required']
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    taskList: {
        type: String,
        enum: ['progress', 'completed'],
        default: 'progress',
    },
    points: {
        type: Number,
        default: 10
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo",
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userTask",
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo",
    }],
}, { timestamps: true });


 
const subUserTask = mongoose.model('subUserTask', subUsertaskSchema);
export { subUserTask };