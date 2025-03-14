import Subscription from "../../models/SuperAdmin/Subscriptions.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/userModel.js";
import Plan from "../../models/SuperAdmin/Plans.js";

// Create a Subscription
const createSubscription = asyncHandler(async (req, res) => {
    const { userEmail, activePlanId, startAt, endAt } = req.body;

    if (!userEmail || !activePlanId || !startAt || !endAt) {
        throw new apiError(400, "All fields are required.");
    }

    // Get user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
        throw new apiError(404, "User not found.");
    }
    if (user.role !== "admin") {
        throw new apiError(400, "Only admin can get subscribtion.");
    }

    // Get plan by ID
    const plan = await Plan.findById(activePlanId);
    if (!plan) {
        throw new apiError(404, "Plan not found.");
    }

    // Create a new subscription
    const subscription = await Subscription.create({
        user: user._id,
        plan: plan._id,
        startAt: startAt,
        endsAt: endAt,
    });

    return res
        .status(201)
        .json(
            new apiResponse(
                201,
                subscription,
                "Subscription created successfully!"
            )
        );
});

// Get all Subscriptions
const getSubscriptions = asyncHandler(async (req, res) => {
    const subscriptions = await Subscription.find().populate("user plan");
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                subscriptions,
                "Subscriptions fetched successfully!"
            )
        );
});

// Get Subscription by ID
const getSubscriptionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const subscription = await Subscription.findById(id).populate("user plan");
    if (!subscription) {
        throw new apiError(404, "Subscription not found.");
    }
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                subscription,
                "Subscription fetched successfully!"
            )
        );
});
// Update subscription
const updateSubscription = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userEmail, activePlanId, startAt, endAt } = req.body;

    const subscription = await Subscription.findById(id).populate("user plan");

    if (!subscription) {
        throw new apiError(404, "Subscription not found.");
    }

    if (userEmail) {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            throw new apiError(404, "User not found.");
        }

        subscription.user = user._id;
    }

    if (activePlanId) {
        const plan = await Plan.findById(activePlanId);

        if (!plan) {
            throw new apiError(404, "Plan not found.");
        }

        subscription.plan = plan._id;
    }

    subscription.startAt = startAt || subscription.startAt;
    subscription.endsAt = endAt || subscription.endsAt;
    await subscription.save();

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                subscription,
                "Subscription Updated successfully!"
            )
        );
});

const deactivateExpiredSubscriptions = asyncHandler(async (req, res) => {
    // Get current date
    const currentDate = new Date();

    // Find subscriptions that have ended and are still active
    const expiredSubscriptions = await Subscription.find({
        endsAt: { $lt: currentDate },
        status: "active",
    }).populate("user");

    for (const subscription of expiredSubscriptions) {
        // Update subscription status to "expired"
        subscription.status = "expired";
        await subscription.save();

        // Mark the user as inactive
        if (subscription.user) {
            await User.findByIdAndUpdate(subscription.user._id, {
                isActive: false,
            });
        }
    }
    if (expiredSubscriptions.length === 0) {
        throw new apiError(404, "No expired subscriptions found.");
    }
    return new apiResponse(
        res,
        200,
        expiredSubscriptions,
        "Expired subscriptions deactivated successfully!"
    );
});

export {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deactivateExpiredSubscriptions,
};
