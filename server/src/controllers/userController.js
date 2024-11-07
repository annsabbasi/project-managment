import { User } from "../models/userModel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessTokenAndRefreshToken = async (tokenId) => {
    try {
        const user = await User.findById(tokenId);
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

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if ([name, email, password, confirmPassword].some((fields) => fields?.trim() === "")) {
        throw new apiError(400, "All fields are required.")
    }
    if (password !== confirmPassword) {
        throw new apiError(400, "password doesn't matched")
    }

    const existedUser = await User.findOne({ $or: [{ email }, { name }] })
    if (existedUser) {
        throw new apiError(400, "User with given credientials already exists")
    }

    const registerUser = await User.create({ name, email, password })
    return res.status(200).json(new apiResponse(200, registerUser, "user register successfully"))

})

const loginUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if ([name, email, password].some((fields) => fields?.trim() === "")) {
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
        secure: true
    }
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



export {
    registerUser,
    loginUser
}