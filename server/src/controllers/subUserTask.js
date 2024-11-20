import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import { subUserTask } from "../models/subUserTask.js";


const createUserTask = asyncHandler(async (req, res) => {
    const { title, assign, description, dueDate, startDate, taskList, points } = req.body;
    if ([title, assign, description, dueDate].some((fields) => !fields?.trim())) {
        throw new apiError(400, "All fields are required.")
    }
    const userId = req.user._id;

    const teamLeadArray = assign.split(',').map(name => name.trim());
    const tasks = [];
    for (const teamLead of teamLeadArray) {
        const user = await User.findOne({ name: teamLead });
        if (!user) {
            throw new apiError(400, `Username with ${teamLead} is not found`)
        }
        tasks.push(teamLead);
    }
    console.log("This is the adminId", tasks.length)
    const newTask = new subUserTask({
        title,
        assign: tasks,
        description,
        dueDate,
        startDate,
        taskList,
        points,
        assignedBy: userId,
    });

    await newTask.save();
    console.log("Assign By User Data", userId)
    console.log("Data from the UserSubTask", newTask)
    return res.status(200).json(new apiResponse(200, newTask, "Task created successfully."))
})


const getUserSubTask = asyncHandler(async (req, res) => {
    const tasks = await subUserTask.find()
        .populate('assignedBy', 'name avatar');

    if (!tasks || tasks.length === 0) {
        // throw new apiError(400, "No tasks found")
        return res.status(200).json(new apiResponse(200, [], "No task found"))
    }
    return res.status(200).json(new apiResponse(200, tasks, "Get Task successfully"))
})


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


export {
    createUserTask,
    getUserSubTask,
    deleteUserSubTask
}
