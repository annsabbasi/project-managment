import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userTracker } from "../models/TrackerTime.js";
import moment from 'moment'
import { adminTask } from "../models/adminTask.js";


// Check-In Functionality
const checkIn = asyncHandler(async (req, res) => {
    const { projectId } = req.body;
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');

    const projectExists = await adminTask.findById(projectId);
    if (!projectExists) {
        throw new apiError(404, "Invalid projectId. Project not found.");
    }

    let timeEntry = await userTracker.findOne({ userId, projectId, date: today });
    if (timeEntry) {
        throw new apiError(400, "You have already checked in for this project today.");
    }

    timeEntry = new userTracker({
        userId,
        projectId,
        date: today,
        checkIn: new Date(),
        isRunning: true,
    });

    await timeEntry.save();
    res.status(200).json(new apiResponse(200, timeEntry, 'CheckedIn successfully.'));
});


// Get Elapsed Time
const getElapsedTime = asyncHandler(async (req, res) => {
    const timer = await userTracker.findOne({
        userId: req.user.id,
        projectId: req.query.projectId,
        date: moment().format('YYYY-MM-DD'),
    });

    if (!timer) {
        return res.status(404).json(new apiResponse(404, { isRunning: false, elapsedTime: 0 }, "No active timer found"));
    }

    // annsabbasi code down
    let elapsedTime = timer.effectiveElapsedTime;
    if (timer.checkIn && timer.isRunning) {
        elapsedTime = Math.floor((Date.now() - new Date(timer.checkIn)) / 1000) - timer.pausedDuration;
    }
    res.status(200).json(new apiResponse(200, {
        isRunning: timer.isRunning,
        isCheckedOut: timer.isCheckedOut,
        elapsedTime,
    }, "Elapsed time fetched successfully."));
});


// Pause or Resume Timer
const pauseOrResume = asyncHandler(async (req, res) => {
    const { projectId } = req.body;
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');

    const timeEntry = await userTracker.findOne({ userId, projectId, date: today });

    if (!timeEntry) {
        throw new apiError(404, "No active session found to pause or resume.");
    }

    if (timeEntry.isCheckedOut) {
        throw new apiError(400, "You have already checked out for this project.");
    }

    if (timeEntry.isRunning) {
        timeEntry.isRunning = false;
        timeEntry.lastPaused = new Date();
        // 2/17/2025 @annsabbasi
        timeEntry.effectiveElapsedTime = Math.floor((Date.now() - new Date(timeEntry.checkIn)) / 1000) - timeEntry.pausedDuration;
    } else {
        if (!timeEntry.lastPaused) {
            throw new apiError(400, "Cannot resume without a paused state.");
        }

        const pausedTime = Math.floor((new Date() - new Date(timeEntry.lastPaused)) / 1000);
        timeEntry.pausedDuration += pausedTime;
        // annsabbasi code down
        timeEntry.effectiveElapsedTime = Math.floor((Date.now() - new Date(timeEntry.checkIn)) / 1000) - timeEntry.pausedDuration;
        // annsabbasi code up
        timeEntry.isRunning = true;
        timeEntry.lastPaused = null;
    }
    console.log("timeEntry.effectiveElapsedTime", timeEntry.effectiveElapsedTime)

    await timeEntry.save();
    // annsabbasi code down
    res.status(200).json(new apiResponse(200, {
        isRunning: timeEntry.isRunning,
        elapsedTime: timeEntry.effectiveElapsedTime
    }, timeEntry.isRunning ? 'Resumed successfully.' : 'Paused successfully.'));
});


// Check-Out Functionality
const checkOut = asyncHandler(async (req, res) => {
    const { projectId } = req.body;
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');

    const timeEntry = await userTracker.findOne({ userId, projectId, date: today });

    if (!timeEntry) {
        throw new apiError(404, "No active session found to check out.");
    }
    if (timeEntry.isCheckedOut) {
        throw new apiError(400, "You have already checked out for this project.");
    }
    if (timeEntry.isRunning && timeEntry.lastPaused) {
        throw new apiError(400, "Cannot check out while paused. Resume before checking out.");
    }

    const checkOutTime = new Date();
    let totalWorkedTime = Math.floor((checkOutTime - new Date(timeEntry.checkIn)) / 1000);
    // const netDuration = totalWorkedTime - timeEntry.pausedDuration;
    // annsabbasi code down
    let netDuration = timeEntry.pausedDuration;
    if (timeEntry.lastPaused) {
        netDuration += Math.floor((checkOutTime - timeEntry.lastPaused) / 1000);
    }
    const sessionDuration = totalWorkedTime - netDuration;
    // annsabbasi code top

    timeEntry.checkOut = checkOutTime;
    // timeEntry.totalDuration = netDuration;
    // annsabbasi code down
    timeEntry.totalDuration = sessionDuration;
    timeEntry.isCheckedOut = true;
    timeEntry.isRunning = false;
    // console.log("checkOut TimerEntry.isRunning", timeEntry)
    await timeEntry.save();
    res.status(200).json(new apiResponse(200, { totalDuration: netDuration }, 'Checked out successfully.'));
});


// For Getting The Daily Time Reports
const getUserTimeProject = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { projectId } = req.query;

    if (!projectId) {
        throw new apiError(400, "Project ID is required.");
    }

    // Find all time entries for the current user in the specified project
    const timeEntries = await userTracker.find({ userId, projectId })

    if (timeEntries.length === 0) {
        return res.status(404).json(new apiResponse(404, { totalTime: 0 }, "No time data found for this project."));
    }

    const getUserTime = await userTracker.find({ userId, projectId }).select("userId projectId checkIn isRunning isCheckedOut totalDuration maxTime effectiveElapsedTime").populate("userId", "name role");
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