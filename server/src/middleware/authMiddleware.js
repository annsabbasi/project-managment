/* eslint-disable no-undef */
import { User } from "../models/userModel.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = (role = []) => asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    // const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.accessToken;
    // console.log("Token (authMiddleware)", token)
    if (!token) throw new apiError(401, "Access token missing");
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // if (!decodedToken?._id) {
        //     throw new apiError(401, "Invalid access token from AuthMiddleware");
        // }

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) throw new apiError(401, "User not found");
        if (role.length > 0 && !role.includes(user.role)) {
            return res.status(403).json({ message: "Access denied." });
        }

        req.user = user
        // eslint-disable-next-line no-undef
        // if (process.env.NODE_ENV === "development") {
        //     console.log("Authenticated user:", user);
        // }
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired, please refresh token" });
        }
        throw new apiError(401, "Invalid token");

        // throw new apiError(401, error?.message || "Invalid Token")
    }
})
