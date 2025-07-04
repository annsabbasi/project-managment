import mongoose from "mongoose";
import { User } from "../models/userModel.js";

import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { subUserTask } from "../models/subUserTask.js";
import { doscSubTask } from "../models/Docs_SubTask/docs_Subtask.js";
import { videoSubTask } from "../models/Video_SubTask/video_Subtask.js";
import { ROLES } from "../config/roles.js";

// Cerate User Sub Task inside Project
const createUserTask = asyncHandler(async (req, res) => {
    const {
        title,
        assign,
        description,
        dueDate,
        startDate,
        taskList,
        points,
        projectId,
    } = req.body;
    if ([title, assign, description].some((fields) => !fields?.trim())) {
        throw new apiError(400, "All fields are required.");
    }
    const userId = req.user._id;

    const teamLeadArray = assign.split(",").map((name) => name.trim());
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
        projectId,
    });

    await newTask.save();
    return res
        .status(200)
        .json(new apiResponse(200, newTask, "Task created successfully."));
});

// Get User Sub Task inside Project
const getUserSubTask = asyncHandler(async (req, res) => {
    const { projectId } = req.query;

    if (!mongoose.isValidObjectId(projectId)) {
        throw new apiError(400, "Invalid Project ID");
    }

    const tasks = await subUserTask
        .find({ projectId })
        .populate("assignedBy", "name avatar")
        .exec();
    if (!tasks || tasks.length === 0) {
        return res.status(200).json(new apiResponse(200, [], "No tasks found"));
    }
    return res
        .status(200)
        .json(new apiResponse(200, tasks, "Tasks fetched successfully"));
});

// Get Users From Assign Sub Tasks
const getUserForSubTask = async (req, res) => {
    const { projectId } = req.params;
    if (!mongoose.isValidObjectId(projectId)) {
        throw new apiError(400, "Invalid Project ID");
    }

    const objectId = new mongoose.Types.ObjectId(projectId);
    if (!objectId) {
        throw new apiError(400, "Invalid objectID");
    }

    const assignedUsers = await subUserTask.aggregate([
        { $match: { projectId: objectId } },
        { $unwind: "$assign" },
        {
            $lookup: {
                from: "userinfos",
                localField: "assign",
                foreignField: "name",
                as: "userDetails",
            },
        },
        { $unwind: "$userDetails" },
        {
            $group: {
                _id: "$assign",
                avatar: { $first: "$userDetails.avatar" },
                id: { $first: "$userDetails._id" },
                role: { $first: "$userDetails.role" },
            },
        },
        {
            $project: {
                _id: 0,
                userId: "$_id",
                avatar: 1,
                id: 1,
                role: 1,
            },
        },
    ]);

    if (assignedUsers.length <= 0) {
        return res
            .status(200)
            .json(new apiResponse(200, [], "No assigned task members found"));
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, assignedUsers, "Tasks fetched successfully")
        );
};

// Delete User Sub Task for Project
const deleteUserSubTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        throw new apiResponse(400, "TaskId is required");
    }
    const deleteTask = await subUserTask.findByIdAndDelete(taskId);
    if (!deleteTask) {
        throw new apiError(400, "No tasks founded to delete");
    }
    return res
        .status(200)
        .json(new apiResponse(200, deleteTask, "Task Deleted Successfully"));
});

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

    // This is for the User cannot update the task if He's already present in that
    const mentionedUser = req.user.name;
    const isUserAssigned = existingTask.assign.some((user) => {
        return user.toString() === mentionedUser.toString();
    });
    if (isUserAssigned) {
        throw new apiError(
            403,
            "You are not allowed to update this task because you are assigned to it."
        );
    }

    const { title, assign, description, taskList, points } = req.body;
    const teamLeadArray =
        assign && typeof assign === "string"
            ? assign.split(",").map((name) => name.trim())
            : existingTask.assign;

    const tasks = [];
    if (teamLeadArray) {
        for (const teamLead of teamLeadArray) {
            const user = await User.findOne({ name: teamLead });
            if (!user) {
                throw new apiError(
                    400,
                    `Username with ${teamLead} is not found`
                );
            }
            tasks.push(teamLead);
        }
    }

    const updateTask = await subUserTask.findByIdAndUpdate(
        taskId,
        {
            title: title || existingTask.title,
            assign: tasks || existingTask.assign,
            description: description || existingTask.description,
            taskList: taskList || existingTask.taskList,
            points: points || existingTask.points,
        },
        { new: true, runValidators: true }
    );
    if (!updateTask) {
        throw new apiError(400, "Task not found");
    }

    return res
        .status(200)
        .json(new apiResponse(200, updateTask, "Task Update Successfully"));
});

// Complete User Sub Task for Project
const completeUserSubTask = asyncHandler(async (req, res) => {
    const { taskID } = req.params;
    const userId = req.user.name;
    if (!mongoose.isValidObjectId(taskID)) {
        throw new apiError(400, "Task ID not valid");
    }

    const getTaskId = await subUserTask
        .findById(taskID)
        .select("taskList assign");
    if (!getTaskId) {
        throw new apiError(400, "Task not found");
    }

    const userInAssign = getTaskId.assign.includes(userId.toString());
    if (!userInAssign) {
        throw new apiError("you cannot perform this action");
    }
    if (getTaskId.taskList === "completed") {
        throw new apiError(400, "The task is already is completed");
    }

    getTaskId.taskList = "completed";
    await getTaskId.save();
    res.status(200).json(
        new apiResponse(200, getTaskId, "Task marked completed successfully")
    );
});

const getCompleteUserSubTask = asyncHandler(async (req, res) => {
    const completedTasks = await subUserTask
        .find({ taskList: "completed" })
        .populate("assignedBy", "name avatar");
    if (!completedTasks || completedTasks.length === 0) {
        return res
            .status(200)
            .json(new apiResponse(200, [], "No completed tasks found"));
    }
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                completedTasks,
                "Completed tasks fetched successfully"
            )
        );
});

const subTaskApproval = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { taskID } = req.params;
    const userRole = req.user.role;
    if (userRole !== ROLES.ADMIN && userRole !== ROLES.QCADMIN) {
        throw new apiError(
            400,
            "you are not Authorized to perform this action"
        );
    }
    if (!mongoose.isValidObjectId(taskID)) {
        throw new apiError(400, "Task ID not valid");
    }

    const approveTask = await subUserTask.findById(taskID).select("taskList");
    if (!approveTask) {
        throw new apiError(400, "Task not found");
    }

    if (status === "approved") {
        if (approveTask.taskList === "approved") {
            return res
                .status(200)
                .json(
                    new apiResponse(
                        200,
                        approveTask,
                        "The Task is already approved"
                    )
                );
        }
        approveTask.taskList = "approved";
    } else if (status === "progress") {
        if (approveTask.taskList === "progress") {
            return res
                .status(200)
                .json(
                    new apiResponse(
                        200,
                        approveTask,
                        "The Task is already rejected and is in progress"
                    )
                );
        }
        approveTask.taskList = "progress";
        approveTask.save();
        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    approveTask,
                    "Task rejected and moved back to progress successfully"
                )
            );
    } else {
        throw new apiError(400, "Invalid status. Use 'approved' or 'reject'");
    }

    approveTask.save();
    res.status(200).json(
        new apiResponse(200, approveTask, "Task Approves successfully")
    );
});

// Filtering the SubTask Data
const filterSubTask = asyncHandler(async (req, res) => {
    const { searchText, filterField, projectId } = req.query;

    if (!projectId || !mongoose.isValidObjectId(projectId)) {
        throw new apiError(400, "Invalid or missing projectId");
    }

    const query = { projectId };

    if (filterField && searchText) {
        query[filterField] = { $regex: searchText, $options: "i" };
    }
    const result = await subUserTask.find(query)
        .populate("assignedBy", "name avatar")
        .exec();
    res.status(200).json(
        new apiResponse(200, result, "Data fetching successfully.")
    );
});

// ----------- Creating Docs and Videos Links Controllers -------------
// Create Docs SubTask Links
const docsSubTask = asyncHandler(async (req, res) => {
    const { title, link, projectId } = req.body;
    if ([title, link].some((fields) => !fields)) {
        throw new apiError(400, "All fields are required.");
    }

    const createDocs = await doscSubTask.create({ title, link, projectId });
    return res
        .status(200)
        .json(
            new apiResponse(200, createDocs, "Docs Link Created Successfully!")
        );
});

// Fetch Docs SubTask Links
const fetchDocsSubTasks = asyncHandler(async (req, res) => {
    const { projectId } = req.query;
    if (!projectId) {
        throw new apiError(404, "No documents found.");
    }

    const docs = await doscSubTask.find({ projectId });
    if (!docs || docs.length === 0) {
        // throw new apiError(404, "No documents found for this project.");
        return new apiResponse(200, [], "No Uploaded links yet");
    }
    return res
        .status(200)
        .json(new apiResponse(200, docs, "Docs fetched successfully!"));
});

// Delete Docs SubTask Links
const deleteDocsSubTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new apiError(404, "Link is required to delete");
    }
    const deleteDocs = await doscSubTask.findOneAndDelete({ _id: id });
    if (!deleteDocs) {
        throw new apiError(400, "No Link founded to delete");
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, deleteDocs, "Docs Link Deleted Successfully!")
        );
});

// ----------- Videos Links Controllers -------------
const videosSubTask = asyncHandler(async (req, res) => {
    const { title, video, projectId } = req.body;
    if ([title, video].some((fields) => !fields)) {
        throw new apiError(400, "All fields are required.");
    }

    const createDocs = await videoSubTask.create({ title, video, projectId });
    return res
        .status(200)
        .json(
            new apiResponse(200, createDocs, "Video Link Created Successfully!")
        );
});

// Fetch Video SubTask Links
const fetchVideoSubTasks = asyncHandler(async (req, res) => {
    const { projectId } = req.query;
    if (!projectId) {
        throw new apiError(404, "No Video Link found.");
    }

    const docs = await videoSubTask.find({ projectId });
    if (!docs || docs.length === 0) {
        return new apiResponse(200, [], "No Uploaded links yet");
    }
    return res
        .status(200)
        .json(new apiResponse(200, docs, "Video fetched successfully!"));
});

// Delete Video SubTask Links
const deleteVideoSubTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new apiError(404, "Video Link is required to delete");
    }
    const deleteDocs = await videoSubTask.findOneAndDelete({ _id: id });
    if (!deleteDocs) {
        throw new apiError(400, "No Link founded to delete");
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, deleteDocs, "Video Link Deleted Successfully!")
        );
});




export {
    createUserTask,
    getUserSubTask,
    deleteUserSubTask,
    updateUserSubTask,
    getCompleteUserSubTask,
    completeUserSubTask,
    subTaskApproval,
    getUserForSubTask,
    filterSubTask,

    // Docs SubTask Links
    docsSubTask,
    deleteDocsSubTask,
    fetchDocsSubTasks,

    // Video SubTask Links
    videosSubTask,
    fetchVideoSubTasks,
    deleteVideoSubTask,
};
