import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "UserInfo",
            required: true,
        },
        plan: {
            type: Schema.Types.ObjectId,
            ref: "plan",
            required: true,
        },
        startAt: {
            type: Date,
            default: Date.now,
        },
        endsAt: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "cancelled", "expired", "pending"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
