import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
        max: [40, "The Title should be no longer than the 40 characters"]
    },
    teamLeadName: {
        type: String,
        required: [true, "Please type the name of the admin"],
    },
    clientName: {
        type: String
    },
    description: {
        type: String,
        max: [40, "The Description should be no longer than the 700 characters"]
    },
    projectStatus: {
        type: String,
        default: 'pending',
        enum: ['pending', 'ended', 'Approved', 'Not Approved'],
    },
    profileImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userinfos",
    },
    members: {
        type: Number,
        max: 100,
        min: 5,
        default: 0
    },
    startDate: {
        type: String,
        default: '00:00:00',
    },
    dueDate: {
        type: String,
        required: [true, 'The Due Data is required']
    },
    budget: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['In Progress', 'Completed', 'Approved', 'Not Approved'],
    },
}, { timestamps: true });

const adminTask = mongoose.model('userTask', taskSchema);

export { adminTask }