import { adminTask } from "../models/adminTask.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";


const createTask = asyncHandler(async (req, res) => {
    const { projectTitle, teamLeadName, description, projectStatus, startDate, dueDate, budget } = req.body;
    if ([projectTitle, teamLeadName, description, dueDate].some((fields) => !fields?.trim())) {
        throw new apiError(400, "All fields are required.")
    }
    const adminId = req.user._id;
    // console.log("UserTask Id:", userTask)

    if (!budget) {
        throw new apiError(400, "Budget and members array are required.");
    }

    const teamLeadArray = teamLeadName.split(',').map(name => name.trim());
    const tasks = [];
    for (const teamLead of teamLeadArray) {
        const user = await User.findOne({ name: teamLead });
        if (!user) {
            throw new apiError(400, `Username with ${teamLead} is not found`)
        }
        tasks.push(teamLead);
    }
    const newTask = new adminTask({
        projectTitle,
        teamLeadName: tasks,
        description,
        projectStatus,
        startDate,
        dueDate,
        budget,
        assignedBy: adminId,
    });

    await newTask.save();
    return res.status(200).json(new apiResponse(200, newTask, "Task created successfully."))
})


const getCreateTask = asyncHandler(async (req, res) => {
    const tasks = await adminTask.find()
        .populate('assignedBy', 'name email avatar role');

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

    const deleteTask = await adminTask.findByIdAndDelete(taskId);
    if (!deleteTask) {
        throw new apiError(400, "No tasks founded to delete")
    }
    return res.status(200).json(new apiResponse(200, deleteTask, "Task Deleted Successfully"))
})


export { createTask, getCreateTask, getDeleteTask }