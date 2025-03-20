import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Department = mongoose.model("department", departmentSchema);

export { Department };
