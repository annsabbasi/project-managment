/* eslint-disable no-undef */
import { User } from "../models/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// export const verifyUser = (role = []) => asyncHandler(async (req, res, next) => {
//     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) throw new apiError(401, "Access token missing");
//     try {
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//         if (!decodedToken) {
//             throw new apiError(401, "Invalid access token from AuthMiddleware");
//         }

//         const user = await User.findById(decodedToken?._id).select("-password")
//         if (!user) throw new apiError(401, "User not found");
//         if (role.length > 0 && !role.includes(user.role)) {
//             return res.status(403).json(new apiResponse(403, {}, "Access Denied"));
//             // return res.status(403).json({ message: "Access denied." });
//         }
//         req.user = user
//         // if (process.env.NODE_ENV === "development") {
//         //     console.log("Authenticated user:", user);
//         // }
//         next();
//     } catch (error) {
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json(new apiResponse(401, {}, "Access token expired, please refresh token"));
//             // return res.status(401).json({ message: "Access token expired, please refresh token" });
//         }
//         throw new apiError(401, "Invalid token");
//     }
// })

// Verify User Middleware
export const verifyUser = (roles = []) =>
    asyncHandler(async (req, res, next) => {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) throw new apiError(401, "Access token missing");

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            if (!decodedToken) throw new apiError(401, "Invalid access token");

            const user = await User.findById(decodedToken._id).select("-password");
            if (!user) throw new apiError(401, "User not found");

            if (roles.length > 0 && !roles.includes(user.role)) {
                return res.status(403).json(new apiResponse(403, {}, "Access Denied"));
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json(new apiResponse(401, {}, "Access token expired"));
            }
            throw new apiError(401, "Invalid token");
        }
    });

// Verify Company Middleware
export const verifyCompany = (roles = []) =>
    asyncHandler(async (req, res, next) => {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) throw new apiError(401, "Access token missing");

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            if (!decodedToken) throw new apiError(401, "Invalid access token");

            const company = await Company.findById(decodedToken._id).select("-password");
            if (!company) throw new apiError(401, "Company not found");

            if (roles.length > 0 && !roles.includes(company.role)) {
                return res.status(403).json(new apiResponse(403, {}, "Access Denied"));
            }

            req.company = company;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json(new apiResponse(401, {}, "Access token expired"));
            }
            throw new apiError(401, "Invalid token");
        }
    });
