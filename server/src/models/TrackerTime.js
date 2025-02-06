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
        default: null
    },
    isRunning: {
        type: Boolean,
        default: false
    },
    checkOut: {
        type: Date,
    },
    isCheckedOut: {
        type: Boolean,
        default: false
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    pausedDuration: {
        type: Number,
        default: 0
    },
    isPaused: {
        type: Date,
        default: null
    },
    lastPaused: {
        type: Date,
    },
    maxTime: {
        type: Number,
        default: 40
    },
    weeklyTime: {
        type: Number,
        default: 0
    }
}, { timestamps: true })



const userTracker = mongoose.model('TimeTracking', TimeTrackingSchema);

export { userTracker }