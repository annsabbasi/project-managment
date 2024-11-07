import { adminTask } from "../models/adminTask.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
    const { projectTitle, teamLeadName, clientName, description, projectStatus, members, startDate, dueDate, budget } = req.body;
    if ([projectTitle, teamLeadName, clientName, description, projectStatus, startDate, dueDate].some((fields) => fields?.trim() === "")) { throw new apiError(400, "All fields are required.") }

    if (!budget || !members) {
        throw new apiError(400, "All fields are required.")
    }

    const createTask = await adminTask.create({ projectTitle, teamLeadName, clientName, description, projectStatus, members, startDate, dueDate, budget })
    if (!createTask) {
        throw new apiError(500, "Something went wrong white creating task... Register Controller")
    }

    return res.status(200).json(new apiResponse(200, createTask, "Task created successfully."))
})


const getCreateTask = asyncHandler(async (req, res) => {
    const tasks = await adminTask.find();
    if (!tasks || tasks.length === 0) {
        throw new apiError(400, "No tasks found.")
    }
    return res.status(200).json(new apiResponse(200, tasks, "Get Task successfully."))
})


const getDeleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        throw new apiResponse(400, "TaskId is required")
    }
    console.log("This is the Delete Task Id:", taskId)

    const deleteTask = await adminTask.findByIdAndDelete(taskId);
    if (!deleteTask) {
        throw new apiError(400, "No tasks founded to delete")
    }
    return res.status(200).json(new apiResponse(200, deleteTask, "Task Deleted Successfully"))
})


export { createTask, getCreateTask, getDeleteTask }