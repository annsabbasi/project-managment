/* eslint-disable no-undef */
import mongoose, { Schema } from "mongoose";
import { ROLES } from "../config/roles.js";

const SuperAdminSchema = new Schema(
    {
        name: {
            type: String,
            // required: [true, "name field is required"],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email field is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "please provide a valid email address"],
        },
        password: {
            type: String,
            required: [true, "password field is required"],
        },
        avatar: {
            type: String,
            default:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQNvWDvQb_rCtRL-p_w329CtzHmfzfWP0FIw&s",
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.SUPERADMIN,
        },
    },
    { timestamps: true }
);

const SuperAdmin = mongoose.model("SuperAdminLogin", SuperAdminSchema);
export { SuperAdmin };
