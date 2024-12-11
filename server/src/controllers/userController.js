import jwt from 'jsonwebtoken'
import { User } from "../models/userModel.js";

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// Generate Access & Refresh Token of User
const generateAccessTokenAndRefreshToken = async (tokenId) => {
    try {
        const user = await User.findById(tokenId);
        if (!user) throw new apiError(404, "User not found");
        const accessToken = user.generateAccessToken();
        const refreshToken = user.refreshAccessToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        throw new apiError(400, "Something went wrong from the")
    }
}


// To Refresh user Login Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    // console.log("The incomingRefreshToken (refreshAccessToken) Controllers", incomingRefreshToken)
    if (!incomingRefreshToken) {
        throw new apiError(401, "UnAuthorized Request")
    }
    try {
        const decodedToken = jwt.verify(
            // eslint-disable-next-line no-undef
            incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken._id).select("refreshToken")
        console.log("This is the user (userController.js)", user)
        if (!user) {
            throw new apiError(401, "Invalid Refresh Token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new apiError(401, "Invalid or Expires Refresh Token")
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user?._id);
        console.log("Successfully refreshed The AccessToken", refreshToken)

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new apiResponse(200, { accessToken, refreshToken }, "Access Token Refreshed Successfukky"))
    } catch (error) {
        console.log("Error from refreshAccessToken", error)
        throw new apiError(401, error?.message || "Error from the refreshAccessToken")
    }
})



// To Register a Person
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existedUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existedUser) {
        return res.status(400).json({ error: "User with given credentials already exists" });
    }
    const registerUser = await User.create({ name, email, password });
    const createdUser = await User.findById(registerUser._id).select("-password -refreshToken");

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
        throw new apiError(404, "All fields are required")
    }
    const user = await User.findOne({ $or: [{ name }, { email }] });
    if (!user) {
        throw new apiError(404, "User not found");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new apiError("Password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password");
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
    };
    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new apiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken,
            }, "User logged in successfully")
        );
});



// To Logout a Person
const logoutUser = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }
    res.clearCookie('accessToken', options)
    res.clearCookie('refreshToken', options)
    return res.status(200).json(
        new apiResponse(200, true, "User logged out successfully")
    )
})



// To get Logged In user Details
const getUserData = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(
        new apiResponse(200, user, "User data fetched successfully")
    )
})



// Get Data of Logged In User
const getAllData = asyncHandler(async (req, res) => {
    const data = await User.find();
    if (data.length === 0) {
        throw new apiError(404, "No users found");
    }
    return res.status(200).json(
        new apiResponse(200, data, "Data Fetched Successfully")
    )
})




export {
    registerUser,
    loginUser,
    getAllData,
    logoutUser,
    refreshAccessToken,
    getUserData
}