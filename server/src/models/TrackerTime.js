import mongoose, { Schema } from 'mongoose';

const TimeTrackingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo",
        required: true
    },
    projectId: {
        type: mongoose.default.Types.ObjectId,
        ref: "userTask",
        // required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo",
        // default: null
        // required: true
    },
    date: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    isPaused: {
        type: Boolean,
        default: false
    },
    lastPaused: {
        type: Date,
    },
    maxTime: {
        type: Number,
        default: 40
    }
}, { timestamps: true })



const userTracker = mongoose.model('TimeTracking', TimeTrackingSchema);

export { userTracker }