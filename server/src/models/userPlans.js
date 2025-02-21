import mongoose, { Schema } from "mongoose";

const planSchema = new Schema(
    {
        name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserInfo",
            required: true,
        },
        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserInfo",
            required: true,
        },
        actions: {
            type: String,
            enum: ["accept", "decline", "pending"],
            default: "pending",
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        totalJoinedLastWeek: {
            type: Number,
            default: 0,
        },
        totalLeftLastWeek: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const userPlan = mongoose.model("userplan", planSchema);

export { userPlan };
