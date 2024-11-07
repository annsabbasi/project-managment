import { User } from "../models/userModel.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new apiError(400, "Invalid User from AuthMiddleware")
        }

        // eslint-disable-next-line no-undef
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            throw new apiError(401, "Invalid access token from AuthMiddleware")
        }

        console.log("This is the authMiddleware data:", user)
        req.user = user
        next();
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid Token")
    }
})