import Settings from "../../models/SuperAdmin/Settings.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// Default settings to be used when no settings are found in the database
const defaultSettings = {
    appName: "My Application",
    appUrl: "https://www.myapplication.com",
    contactEmail: "support@myapplication.com",
    logoUrl: "https://www.myapplication.com/logo.png",
    maintenanceMode: false,
};

// Controller to get current settings or set default if none exist
export const getSettings = asyncHandler(async (req, res) => {
    let settings = await Settings.findOne({});
    // If no settings are found, create and save the default settings
    if (!settings) {
        settings = await Settings.create(defaultSettings);
        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    settings,
                    "Subscriptions fetched successfully!"
                )
            );
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                settings,
                "Subscriptions fetched successfully!"
            )
        );
});

// Controller to update Application Information
export const updateApplicationInfo = asyncHandler(async (req, res) => {
    const { appName, appUrl } = req.body;
    if (!appName || !appUrl) {
        throw new apiError(400, "Application Name and URL are required");
    }

    const updatedSettings = await Settings.findOneAndUpdate(
        {},
        { appName, appUrl },
        { new: true, upsert: true }
    );

    return new apiResponse(
        200,
        updatedSettings,
        "Application info updated successfully"
    );
});

// Controller to update Contact Information
export const updateContactInfo = asyncHandler(async (req, res) => {
    const { contactEmail, logoUrl } = req.body;

    if (!contactEmail || !logoUrl) {
        throw new apiError(400, "Contact Email and Logo URL are required");
    }

    const updatedSettings = await Settings.findOneAndUpdate(
        {},
        { contactEmail, logoUrl },
        { new: true, upsert: true }
    );

    return new apiResponse(
        200,
        updatedSettings,
        "Contact info updated successfully"
    );
});

// Controller to update Maintenance Settings
export const updateMaintenance = asyncHandler(async (req, res) => {
    const { maintenanceMode } = req.body;

    if (typeof maintenanceMode !== "boolean") {
        throw new apiError(400, "Maintenance mode must be a boolean value");
    }

    const updatedSettings = await Settings.findOneAndUpdate(
        {},
        { maintenanceMode },
        { new: true, upsert: true }
    );

    return new apiResponse(
        200,
        updatedSettings,
        "Maintenance settings updated successfully"
    );
});

export default {
    getSettings,
    updateApplicationInfo,
    updateContactInfo,
    updateMaintenance,
};
