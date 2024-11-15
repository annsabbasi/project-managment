import { User } from "../models/userModel.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = (role = []) => asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new apiError(400, "Invalid User from AuthMiddleware")
        }

        // eslint-disable-next-line no-undef
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken?._id) {
            throw new apiError(401, "Invalid access token from AuthMiddleware");
        }
        // console.log("Decoded token:", decodedToken);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new apiError(401, "Invalid access token from AuthMiddleware")
        }
        if (role.length > 0 && !role.includes(user.role)) {
            return res.status(403).json({ message: "Access denied." });
        }

        // console.log("This is the authMiddleware data:", user)
        req.user = user
        // Step 6: For development purposes, you can log the user (optional)
        // eslint-disable-next-line no-undef
        if (process.env.NODE_ENV === "development") {
            console.log("Authenticated user:", user);
        }
        next();
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid Token")
    }
})
