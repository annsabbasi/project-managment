// import { User } from "../../models/userModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiError } from "../../utils/apiError.js";
import Subscription from "../../models/SuperAdmin/Subscriptions.js";
import { SuperAdmin } from "../../models/superadminModel.js";

// Generate Access & Refresh Token of User
const generateAccessTokenAndRefreshToken = async (tokenId) => {
    const user = await SuperAdmin.findById(tokenId);
    if (!user) throw new apiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.refreshAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
};

const loginSuperAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // if (!email || !password) {
    //     throw new apiError(400, "All fields are required");
    // }

    const user = await SuperAdmin.findOne({ email });

    if (!user) {
        throw new apiError(404, "User not found");
    }
    if (!password) {
        throw new apiError(401, "Password is incorrect");
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
    // Get the user details without password and refreshToken
    const loggedInUser = await SuperAdmin.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 12 * 24 * 60 * 60 * 1000,
    };

    // Send response with cookies
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


export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, isActive } = req.body;

    // Ensure at least one field is provided
    if (name === undefined && isActive === undefined && email === undefined) {
        throw new apiError(
            400,
            "At least one field (name, or isActive) is required for update"
        );
    }

    // Find the user by ID
    const user = await SuperAdmin.findById(id);
    if (!user) {
        throw new apiError(404, "User not found");
    }

    // if is active false then deactivate subscription
    if (isActive === false && user.isActive === true) {
        const subscription = await Subscription.findOne({ user: id });
        if (subscription) {
            subscription.status = "cancelled";
            await subscription.save();
        }
    }

    // if is active true then activate subscription
    if (isActive === true && user.isActive === false) {
        const subscription = await Subscription.findOne({ user: id });
        if (subscription) {
            subscription.status = "active";
            await subscription.save();
        }
    }

    // Update only provided fields (using PATCH semantics)
    if (name !== undefined) user.name = name;
    if (isActive !== undefined) user.isActive = isActive;
    if (email !== undefined) user.email = email;

    await user.save();

    return res
        .status(200)
        .json(new apiResponse(200, user, "User updated successfully!"));
});

export default {
    loginSuperAdmin,
    updateUser,
};
