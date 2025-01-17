import mongoose, { Schema } from 'mongoose';

const planSchema = new Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo",
        required: true
    },
    title: {
        type: String,
        enum: ['accept', 'decline', 'pending'],
        default: 'pending'
    },
    designation: {
        type: Number,
        required: true
    },
}, { timestamps: true })



const userPlan = mongoose.model('userplan', planSchema);

export { userPlan }