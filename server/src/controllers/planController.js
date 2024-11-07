import { userPlan } from "../models/userPlans";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getAllPlan = asyncHandler(async (req, res) => {
    const plan = await userPlan.find();
    return res.status(200).json(new apiResponse(200, plan, "Task created successfully."))
})


const createPlan = asyncHandler(async (req, res) => {
    const { name, description, accessLevel } = req.body;
    const plan = new userPlan({ name, description, accessLevel })
    await plan.save();
    return res.status(200).json(new apiResponse(200, plan, "Task created successfully."))
})

export { getAllPlan, createPlan }