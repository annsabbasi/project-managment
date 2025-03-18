/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ROLES } from "../config/roles.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// Generate Access & Refresh Token of User
const generateAccessTokenAndRefreshToken = async (tokenId) => {
    const user = await User.findById(tokenId);
    if (!user) throw new apiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.refreshAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
};


// To Refresh user Login Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new apiError(401, "UnAuthorized Request");
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        const user = await User.findById(decodedToken._id).select("-password");
        if (!user) {
            throw new apiError(401, "Invalid Refresh Token");
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(401, "Invalid or Expires Refresh Token");
        }

        const options = {
            httpOnly: true,
            secure: "true",
            sameSite: "None",
            maxAge: 12 * 24 * 60 * 60 * 1000,
        };
        const { accessToken, refreshToken } =
            await generateAccessTokenAndRefreshToken(user?._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new apiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Access Token Refreshed Successfukky"
                )
            );
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // Clear refresh token from database and cookies
            const decodedToken = jwt.decode(incomingRefreshToken);
            if (decodedToken?._id) {
                const user = await User.findById(decodedToken._id);
                if (user) {
                    user.refreshToken = null;
                    await user.save();
                }
            }
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
        }
        return res.status(401).json({ message: "Refresh Token Expired" });
    }
});


// To Register a Person
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existedUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existedUser) {
        return res
            .status(400)
            .json({ error: "User with given credentials already exists" });
    }
    const registerUser = await User.create({ name, email, password });
    const createdUser = await User.findById(registerUser._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new Error("Something went wrong while registering the user");
    }
    return res.status(200).json({
        message: "User registered successfully",
        user: createdUser,
    });
});


// To Login a Person
const loginUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if ((!name || !email) && !password) {
        throw new apiError(404, "All fields are required");
    }
    const user = await User.findOne({ $or: [{ name }, { email }] });
    if (!user) {
        throw new apiError(404, "User not found");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new apiError("Password is incorrect");
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: "true",
        sameSite: "None",
        maxAge: 12 * 24 * 60 * 60 * 1000,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});


// To Logout a Person
const logoutUser = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
    };
    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);
    return res
        .status(200)
        .json(new apiResponse(200, true, "User logged out successfully"));
});


// To get Logged In user Details
const getUserData = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(
        new apiResponse(200, user, "User data fetched successfully")
    );
});


// Get Data of Logged In User
const getAllData = asyncHandler(async (req, res) => {
    const data = await User.find();
    if (data.length === 0) {
        throw new apiError(404, "No users found");
    }
    return res
        .status(200)
        .json(new apiResponse(200, data, "Data Fetched Successfully"));
});


// For The Testing Purpose To Get the User Data
const getUserProfile = asyncHandler(async (req, res) => {
    const token = req.cookies?.accessToken;
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await User.findById(verify._id).select(
        "-password -refreshToken"
    );
    if (!findUser) {
        throw new apiError(404, "User Not Found!");
    }
    res.status(200).json(
        new apiResponse(200, findUser, "User data fetched successfully!")
    );
});


// Promoting a User To QC-Admin
const promoteUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        throw new apiError(400, "User ID is required.");
    }

    if (req.user.role !== ROLES.ADMIN) {
        throw new apiError(
            403,
            "You don't have to authority to perform this action"
        );
    }

    const userToPromote = await User.findById(userId);
    if (!userToPromote) {
        throw new apiError(404, "User not found.");
    }
    if (userToPromote.role === ROLES.QCADMIN) {
        return res
            .status(400)
            .json(new apiResponse(400, {}, "User is already a QcAdmin."));
    }

    userToPromote.role = ROLES.QCADMIN;
    await userToPromote.save();

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                { userId: userToPromote._id, role: userToPromote.role },
                "User promoted to QcAdmin successfully."
            )
        );
});


// Update Username email and Profile Picture
const updateUser = asyncHandler(async (req, res) => {
    const { name, email, description, slackId, upworkId, linkedinId, facebookId, gender, hourlyRate } = req.body;
    const userId = req.user._id;

    let user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { name }],
        _id: { $ne: userId },
    });

    if (existingUser) {
        return res.status(400).json({ error: "Email or Name already taken" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (description) user.description = description;
    if (slackId) user.slackId = slackId;
    if (upworkId) user.upworkId = upworkId;
    if (linkedinId) user.linkedinId = linkedinId;
    if (facebookId) user.facebookId = facebookId;
    if (gender) user.gender = gender;
    if (hourlyRate) user.hourlyRate = hourlyRate;

    if (req.file) {
        const uploadResponse = await uploadOnCloudinary(req.file.path);
        if (!uploadResponse) {
            return res.status(500).json({ error: "Failed to upload image" });
        }
        user.avatar = uploadResponse.secure_url;
    }

    await user.save();
    const updatedUser = await User.findById(userId).select("-password -refreshToken");

    return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
    });
});

const getTeamUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const findUser = await User.findById(id).select("-password -refreshToken");
    if (!findUser) {
        throw new apiError(404, "User Not Found!");
    }
    res.status(200).json(new apiResponse(200, findUser, "User data fetched successfully!"));
});


export {
    registerUser,
    loginUser,
    getAllData,
    logoutUser,
    refreshAccessToken,
    getUserData,
    getUserProfile,
    promoteUser,
    updateUser,
    getTeamUserProfile
};