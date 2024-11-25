import { adminTask } from "../models/adminTask.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";

// Creating a Task
const createTask = asyncHandler(async (req, res) => {
    const { projectTitle, teamLeadName, description, projectStatus, startDate, dueDate, budget } = req.body;
    if ([projectTitle, teamLeadName, description, dueDate].some((fields) => !fields?.trim())) {
        throw new apiError(400, "All fields are required.")
    }
    const adminId = req.user._id;

    // <--- CODE FOR ONLY ADMIN TO ASSIGN TASK --->
    // const admin = await User.findById(req.user.id); // Get the current logged-in admin
    // if (!admin || admin.role !== 'admin') {
    //   return res.status(403).json({ message: 'Only admins can assign tasks.' });
    // }


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
        members: tasks.length
    });

    await newTask.save();
    return res.status(200).json(new apiResponse(200, newTask, "Task created successfully."))
})


// Getting the data of the Task
const getCreateTask = asyncHandler(async (req, res) => {
    const tasks = await adminTask.find()
        .populate('assignedBy', 'name avatar');

    if (!tasks || tasks.length === 0) {
        return res.status(200).json(new apiResponse(200, [], "No task found"))
    }
    return res.status(200).json(new apiResponse(200, tasks, "Get Task successfully"))
})


// Deleting the data of the Task
const DeleteTask = asyncHandler(async (req, res) => {
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


// Updating the Task
const UpdateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!mongoose.isValidObjectId(taskId)) {
        throw new apiError(400, "Invalid Task ID format");
    }

    const existingTask = await adminTask.findById(taskId);
    if (!existingTask) {
        throw new apiError(400, "Task not found");
    }
    console.log("This is the existingTask", existingTask)
    const { projectTitle, teamLeadName, description, projectStatus, points } = req.body;
    const teamLeadArray = teamLeadName && typeof teamLeadName === 'string'
        ? teamLeadName.split(',').map(name => name.trim())
        : existingTask.teamLeadName;

    console.log("Received Task ID:", req.params.taskId);
    console.log("Received Body:", req.body);

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

    const updateTask = await adminTask.findByIdAndUpdate(taskId, {
        projectTitle: projectTitle || existingTask.projectTitle,
        teamLeadName: tasks || existingTask.teamLeadName,
        description: description || existingTask.description,
        projectStatus: projectStatus || existingTask.projectStatus,
        points: points || existingTask.projectStatus
    }, { new: true, runValidators: true })
    if (!updateTask) {
        throw new apiError(400, 'Task not found')
    }

    console.log("Task updated successfully:", updateTask)
    return res.status(200).json(new apiResponse(200, updateTask, "Task Update Successfully"))
})


// Getting a Single Task by ID
const getCreateTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await adminTask.findById(id);

    if (!task) {
        throw new apiError(400, "Task not found");
    }
    return res.status(200).json(new apiResponse(200, task, "Task Update Successfully"))
})



// Updating the Task ProjectStatus
const submitTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await adminTask.findById(taskId);
    if (!task) {
        throw new apiError(400, "Task not found")
    }
    // task.status = "Completed";
    task.status = status;
    await task.save();

    res.status(200).json(new apiResponse(200, task, "Task Status Updated"))
})



// Project Approcal or DisApproval from Admin
const projectApproval = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { projectStatus } = req.body;

    const task = await adminTask.findByIdAndUpdate(
        taskId,
        { projectStatus },
        { new: true }
    );;
    if (!task) {
        throw new apiError(400, "Task not found")
    }

    task.projectStatus = projectStatus;
    await task.save();
    console.log("SubmitTask (AdminTask)", task)
    res.status(200).json(new apiResponse(200, task, `Task ${projectStatus} successfully`))
})


export {
    createTask,
    getCreateTask,
    DeleteTask,
    UpdateTask,
    getCreateTaskById,
    submitTask,
    projectApproval
}
