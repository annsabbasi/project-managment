import Notification from "../../models/SuperAdmin/Notifications.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// Create a Notification
const createNotification = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        throw new apiError(400, "All fields are required.");
    }

    const notification = await Notification.create({ title, description });

    return res
        .status(201)
        .json(
            new apiResponse(
                201,
                notification,
                "Notification created successfully!"
            )
        );
});

// Get all Notifications
const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find();
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                notifications,
                "Notifications fetched successfully!"
            )
        );
});

// Delete a Notification
const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
        throw new apiError(404, "Notification not found.");
    }
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                deletedNotification,
                "Notification deleted successfully!"
            )
        );
});

export { createNotification, getNotifications, deleteNotification };
