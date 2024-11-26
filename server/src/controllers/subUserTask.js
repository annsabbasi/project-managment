import mongoose from "mongoose";
import { User } from "../models/userModel.js";

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { subUserTask } from "../models/subUserTask.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Cerate User Sub Task inside Project
const createUserTask = asyncHandler(async (req, res) => {
    const { title, assign, description, dueDate, startDate, taskList, points, projectId } = req.body;
    if ([title, assign, description].some((fields) => !fields?.trim())) {
        throw new apiError(400, "All fields are required.")
    }
    const userId = req.user._id;

    const teamLeadArray = assign.split(',').map(name => name.trim());
    const tasks = [];
    for (const teamLead of teamLeadArray) {
        const user = await User.findOne({ name: teamLead });
        if (!user) {
            throw new apiError(400, `Username with ${teamLead} is not found`);
        }
        tasks.push(teamLead);
    }
    const newTask = new subUserTask({
        title,
        assign: tasks,
        description,
        dueDate,
        startDate,
        taskList,
        points,
        assignedBy: userId,
        projectId
    });

    await newTask.save();
    return res.status(200).json(new apiResponse(200, newTask, "Task created successfully."))
})



// Get User Sub Task inside Project
const getUserSubTask = asyncHandler(async (req, res) => {
    const { projectId } = req.query;

    if (!mongoose.isValidObjectId(projectId)) {
        throw new apiError(400, "Invalid Project ID");
    }

    const tasks = await subUserTask.find({ projectId })
        .populate("assignedBy", "name avatar");

    if (!tasks || tasks.length === 0) {
        return res.status(200).json(new apiResponse(200, [], "No tasks found"));
    }
    return res.status(200).json(new apiResponse(200, tasks, "Tasks fetched successfully"));
});



// Delete User Sub Task for Project
const deleteUserSubTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        throw new apiResponse(400, "TaskId is required")
    }
    const deleteTask = await subUserTask.findByIdAndDelete(taskId);
    if (!deleteTask) {
        throw new apiError(400, "No tasks founded to delete")
    }
    return res.status(200).json(new apiResponse(200, deleteTask, "Task Deleted Successfully"))
})



// Update User Sub Task for Project
const updateUserSubTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!mongoose.isValidObjectId(taskId)) {
        throw new apiError(400, "Invalid Task ID format");
    }

    const existingTask = await subUserTask.findById(taskId);
    if (!existingTask) {
        throw new apiError(400, "Task not found");
    }
    const { title, assign, description, taskList, points } = req.body;
    const teamLeadArray = assign && typeof assign === 'string'
        ? assign.split(',').map(name => name.trim())
        : existingTask.assign;


    const tasks = [];
    if (teamLeadArray) {
        for (const teamLead of teamLeadArray) {
            const user = await User.findOne({ name: teamLead });
            if (!user) {
                throw new apiError(400, `Username with ${teamLead} is not found`);
            }
            tasks.push(teamLead);
        }
    }

    const updateTask = await subUserTask.findByIdAndUpdate(taskId, {
        title: title || existingTask.title,
        assign: tasks || existingTask.assign,
        description: description || existingTask.description,
        taskList: taskList || existingTask.taskList,
        points: points || existingTask.points
    }, { new: true, runValidators: true })
    if (!updateTask) {
        throw new apiError(400, 'Task not found')
    }

    return res.status(200).json(new apiResponse(200, updateTask, "Task Update Successfully"))
})




// const updateUserSubTask = asyncHandler(async (req, res) => {
//     const taskId = req.params.taskId;
//     if (!mongoose.isValidObjectId(taskId)) {
//         throw new apiError(400, "Invalid Task ID format");
//     }
//     const existingTask = await subUserTask.findById(taskId);
//     if (!existingTask) {
//         throw new apiError(400, "Task not found");
//     }

//     const { points } = req.body;
//     const updateSubTask = await subUserTask.findByIdAndUpdate(taskId, {
//         points: points || existingTask.projectStatus
//     }, { new: true, runValidators: true })
//     if (!updateSubTask) {
//         throw new apiError(400, 'Task not found')
//     }

//     return res.status(200).json(new apiResponse(200, updateSubTask, "Task Update Successfully"))
// })



export {
    createUserTask,
    getUserSubTask,
    deleteUserSubTask,
    updateUserSubTask
}




// const getUserSubTask = asyncHandler(async (req, res) => {
//     const tasks = await subUserTask.find()
//         .populate('assignedBy', 'name avatar');

//     if (!tasks || tasks.length === 0) {
//         // throw new apiError(400, "No tasks found")
//         return res.status(200).json(new apiResponse(200, [], "No task found"))
//     }
//     return res.status(200).json(new apiResponse(200, tasks, "Get Task successfully"))
// })