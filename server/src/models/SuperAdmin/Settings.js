import mongoose, { Schema } from "mongoose";

const SettingsSchema = new Schema(
    {
        appName: {
            type: String,
            trim: true,
        },
        appUrl: {
            type: String,
            trim: true,
            lowercase: true,
        },
        contactEmail: {
            type: String,
            trim: true,
            lowercase: true,
        },
        logoUrl: {
            type: String,
            trim: true,
        },
        maintenanceMode: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

const Settings = mongoose.model("Settings", SettingsSchema);

export default Settings;
