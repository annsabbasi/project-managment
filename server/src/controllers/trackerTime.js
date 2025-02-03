import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userTracker } from "../models/TrackerTime.js";
import moment from 'moment'
import { adminTask } from "../models/adminTask.js";


const checkIn = asyncHandler(async (req, res) => {
    const { projectId } = req.body; // Get projectId from request body
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');

    // Validate if projectId exists in the userTask collection
    const projectExists = await adminTask.findById(projectId);
    if (!projectExists) {
        throw new apiError(404, "Invalid projectId. Project not found.");
    }

    // Check if user has already checked in today for this project
    let timeEntry = await userTracker.findOne({ userId, projectId, date: today });

    if (timeEntry) {
        throw new apiError(400, "You have already checked in for this project today.");
    }

    // Create a new check-in entry with projectId
    timeEntry = new userTracker({
        userId,
        projectId,
        date: today,
        checkIn: new Date(),
        isRunning: true,
    });

    await timeEntry.save();
    console.log("This is the CheckIn Data", timeEntry);
    res.status(200).json(new apiResponse(200, timeEntry, 'Checked in successfully.'));
});


// For The User Continous Time
const getElapsedTime = asyncHandler(async (req, res) => {
    let timer = await userTracker.findOne({
        userId: req.user.id,
        projectId: req.query.projectId,
        date: moment().format('YYYY-MM-DD'),
    });
    if (!timer) {
        return res.status(404).json(new apiResponse(404, { isRunning: false, elapsedTime: 0 }, "No active timer found"));
    }

    let elapsedTime = 0;
    if (timer.checkIn && timer.isRunning) {
        elapsedTime = Math.floor((Date.now() - new Date(timer.checkIn)) / 1000);
    }

    res.status(200).json(new apiResponse(200, {
        isRunning: timer.isRunning,
        isCheckedOut: timer.isCheckedOut,
        elapsedTime,
        totalDuration: timer.totalDuration || 0,
        checkIn: timer.checkIn
    }, "Elapsed time fetched successfully."));
});


// Pause or Resume Timer
const pauseOrResume = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');

    let timeEntry = await userTracker.findOne({ userId, projectId: req.body.projectId, date: today });

    if (!timeEntry) {
        throw new apiError(404, `No Check-In found for ${today}`);
    }

    if (timeEntry.isCheckedOut) {
        throw new apiError(400, "Cannot pause or resume after check-out.");
    }

    if (timeEntry.isRunning) {
        // Pause logic
        timeEntry.isRunning = false;
        timeEntry.lastPaused = new Date();
    } else {
        // Resume logic
        if (!timeEntry.lastPaused) {
            throw new apiError(400, "Invalid pause state. No last pause recorded.");
        }

        const pauseDuration = Math.floor((new Date() - timeEntry.lastPaused) / 1000);
        timeEntry.pausedDuration += pauseDuration;

        // Adjisting the Paused Duration to start where it have paused
        if (timeEntry.checkIn) {
            timeEntry.checkIn = new Date(timeEntry.checkIn.getTime() + pauseDuration * 1000);
        }

        timeEntry.isRunning = true;
        timeEntry.lastPaused = null;
    }

    await timeEntry.save();
    res.status(200).json(new apiResponse(200, timeEntry, timeEntry.isRunning ? "Resumed successfully." : "Paused successfully."));
});


// For The User CheckOut
const checkOut = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');

    let timeEntry = await userTracker.findOne({ userId, projectId: req.body.projectId, date: today });
    if (!timeEntry) {
        throw new apiError(404, `No CheckIn was found for ${today}`);
    }
    if (timeEntry.isCheckedOut) {
        throw new apiError(404, 'You already have checked out for today.');
    }
    if (timeEntry.isRunning) {
        throw new apiError(410, "Timer is Resumed. Pause it first to check out.");
    }

    const checkOutTime = new Date();
    let elapsedTime = Math.floor((checkOutTime - timeEntry.checkIn) / 1000);
    let totalPausedTime = timeEntry.pausedDuration;

    if (timeEntry.lastPaused) {
        totalPausedTime += Math.floor((checkOutTime - timeEntry.lastPaused) / 1000);
    }

    const sessionDuration = elapsedTime - totalPausedTime;

    timeEntry.checkOut = checkOutTime;
    timeEntry.totalDuration = sessionDuration;
    timeEntry.isCheckedOut = true;
    timeEntry.isRunning = false;

    await timeEntry.save();
    res.status(200).json(new apiResponse(200, timeEntry, "CheckOut successfully."));
});


// For Getting The Daily Time Reports
const getUserTimeProject = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { projectId } = req.query;

    if (!projectId) {
        throw new apiError(400, "Project ID is required.");
    }

    // Find all time entries for the current user in the specified project
    const timeEntries = await userTracker.find({ userId, projectId });

    if (timeEntries.length === 0) {
        return res.status(404).json(new apiResponse(404, { totalTime: 0 }, "No time data found for this project."));
    }

    const getUserTime = await userTracker.find({ userId }).select("projectId userId totalDuration pausedDuration lastPause maxTime")
    res.status(200).json(new apiResponse(200, { projectId, getUserTime }, "User total time fetched successfully."));
});


const getUsersTimeProject = asyncHandler(async (req, res) => {
    const { projectId } = req.query;

    if (!projectId) {
        throw new apiError(400, "Project ID is required.");
    }

    // Fetch only the records where projectId matches the provided one
    const timeEntries = await userTracker.find({ projectId }).select("projectId userId totalDuration pausedDuration lastPaused maxTime");

    if (timeEntries.length === 0) {
        return res.status(404).json(new apiResponse(404, [], "No users found for this project."));
    }

    res.status(200).json(new apiResponse(200, timeEntries, "Project users' time fetched successfully."));
});





export {
    checkIn,
    pauseOrResume,
    checkOut,
    getElapsedTime,
    getUserTimeProject,
    getUsersTimeProject,
}