import mongoose, { Schema } from "mongoose";

const PlanSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "title field is required"],
        },
        description: {
            type: String,
            required: [true, "description field is required"],
        },
        price: {
            type: Number,
            required: [true, "price field is required"],
        },
        paymentGatewayPlanId: {
            type: String,
            required: [false, "stripe Plan_Id field is required"],
            trim: true,
        },
        interval: {
            type: String,
            required: [true, "interval field is required"],
            enum: ["month", "year"],
        },
        maxUsers: {
            type: Number,
            required: [true, "Company User Limit field is required"],
        },
        mostPopular: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Plan = mongoose.model("plan", PlanSchema);

export default Plan;
