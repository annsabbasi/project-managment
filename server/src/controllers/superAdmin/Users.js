import { User } from "../../models/userModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiError } from "../../utils/apiError.js";
import Subscription from "../../models/SuperAdmin/Subscriptions.js";

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
    const user = await User.findById(id);
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
    updateUser,
};
