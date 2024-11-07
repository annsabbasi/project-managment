import { User } from "../models/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

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

// To Register a Person
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        throw new apiError(400, "password doesn't matched")
    }

    // TODO HAVE TO RESOLVE THIS
    const existedUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existedUser) {
        console.error("Attempted to register with existing credentials:", { existedUser });
        throw new apiError(400, "User with given credentials already exists");
    }

    const registerUser = await User.create({ name, email, password })
    const createdUser = await User.findById(registerUser._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new apiError(500, "Something went wrong white Registrating User... Register Controller")
    }

    return res.status(200).json(new apiResponse(200, createdUser, "user register successfully"));
})

// To Login a Person
const loginUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if ([name || email, password].some((fields) => fields?.trim() === "")) {
        throw new apiError(400, "All fields are required.")
    }

    const user = await User.findOne({ $or: [{ name }, { email }] })
    if (!user) {
        throw new apiError(404, "User not found")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new apiError(404, "Password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    }
    console.log("This is RefreshToken", refreshToken)
    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(
            new apiResponse(200, {
                user: loggedInUser, accessToken,
                refreshToken
            }, "user logged in successfully")
        )
})

// To Logout a Person
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(200).json(
        new apiResponse(200, true, "User logged out successfully")
    )
    console.log("This is the clearCookie user is logout")
})

// To Refresh user Login Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new apiError(401, "UnAuthorized Request")
    }

    try {
        const decodedToken = jwt.verify(
            // eslint-disable-next-line no-undef
            incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken._id)
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
        const { accessToken, newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id)

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new apiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access Token Refreshed Successfukky"))
    } catch (error) {
        // console.log("Error from the refreshAccessToken")
        throw new apiError(401, error?.message || "Error from the refreshAccessToken")
    }
})

// To get Logged In user Details
const getUserData = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(
        new apiResponse(200, user, "User data fetched successfully")
    )
})


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