import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "title field is required"],
        },
        description: {
            type: String,
            required: [true, "description field is required"],
        },
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
