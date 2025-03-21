import Plan from "../../models/SuperAdmin/Plans.js";
import { apiError } from "../../utils/apiError.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// Create a new Plan
const createPlan = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        paymentGatewayPlanId,
        interval,
        maxUsers,
        mostPopular,
    } = req.body;

    if (
        !title ||
        !description ||
        !price ||
        // !paymentGatewayPlanId ||
        !interval ||
        !maxUsers
    ) {
        throw new apiError(400, "All fields are requiredd.");
    }

    const plan = await Plan.create({
        title,
        description,
        price,
        paymentGatewayPlanId,
        interval,
        maxUsers,
        mostPopular,
    });

    return res
        .status(201)
        .json(new apiResponse(201, plan, "Plan created successfully!"));
});

// Get all Plans
const getPlans = asyncHandler(async (req, res) => {
    const plans = await Plan.find();
    return res
        .status(200)
        .json(new apiResponse(200, plans, "Plans fetched successfully!"));
});

// Get a single Plan by ID
const getPlanById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const plan = await Plan.findById(id);
    if (!plan) {
        throw new apiError(404, "Plan not found.");
    }
    return res
        .status(200)
        .json(new apiResponse(200, plan, "Plan fetched successfully!"));
});

// Update a Plan
const updatePlan = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id || id === "undefined") {
        throw new apiError(404, "Plan not found.");
    }
    const updatedPlan = await Plan.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!updatedPlan) {
        throw new apiError(404, "Plan not found.");
    }
    return res
        .status(200)
        .json(new apiResponse(200, updatedPlan, "Plan updated successfully!"));
});

// Delete a Plan
const deletePlan = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedPlan = await Plan.findByIdAndDelete(id);
    if (!deletedPlan) {
        throw new apiError(404, "Plan not found.");
    }
    return res
        .status(200)
        .json(new apiResponse(200, deletedPlan, "Plan deleted successfully!"));
});

export { createPlan, getPlans, getPlanById, updatePlan, deletePlan };
