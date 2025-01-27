import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userTracker } from "../models/TrackerTime.js";
import moment from 'moment'



// For The User CheckIn
const checkIn = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');

    let timeEntry = await userTracker.findOne({ userId, date: today });
    // Check if user has already checked in today
    if (timeEntry) {
        throw new apiError(404, "You already have checkedIn today.")
    }

    timeEntry = new userTracker({
        userId,
        date: today,
        checkIn: new Date(),
    });

    await timeEntry.save();
    res.status(200).json(new apiResponse(200, timeEntry, 'CheckedIn successfully.'));
})


// For The User (Pause & Resume) Timer
const pauseOrResume = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');
    let timeEntry = await userTracker.findOne({ userId, date: today });

    if (!timeEntry) {
        throw new apiError(404, `No CheckIn was found for ${today}`)
    }
    if (timeEntry.checkOut) {
        throw new apiError(400, "No have already check Out no further action allowed")
    }


    if (timeEntry.isPaused) {
        const pausedDuration = Math.floor((new Date() - timeEntry.lastPaused) / 1000);
        if (!timeEntry.lastPaused) {
            throw new apiError(500, "No valid paused time found.");
        }
        timeEntry.totalDuration += pausedDuration;
        timeEntry.isPaused = false;
        timeEntry.lastPaused = new Date();
    } else {
        timeEntry.isPaused = true;
        timeEntry.lastPaused = new Date();
    }

    await timeEntry.save();
    res.status(200).json(new apiResponse(200, timeEntry, (timeEntry.isPaused ? "Time Paused successfully." : "Time Resumed successfully.")))
})


// For The User CheckOut
const checkOut = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD')

    let timeEntry = await userTracker.findOne({ userId, date: today });
    if (!timeEntry) {
        throw new apiError(404, `No CheckIn was found for ${today}`)
    }
    if (timeEntry.checkOut) {
        throw new apiError(404, 'You already have checkout for today.')
    }
    if (timeEntry.isPaused) {
        throw new apiError(410, "Timer is paused. Resume it first to check out.")
    }

    const checkOutTime = new Date();
    // const sessionDuration = Math.floor((checkOutTime - timeEntry.checkIn) / 1000);
    const sessionDuration = timeEntry.totalDuration + Math.floor((checkOutTime - timeEntry.checkIn) / 1000);


    timeEntry.checkOut = checkOutTime;
    timeEntry.totalDuration = sessionDuration;
    // timeEntry.totalDuration += sessionDuration;
    await timeEntry.save();
    res.status(200).json(new apiResponse(200, timeEntry, "CheckOut successfully."))

    // Calculate hours and minutes
    // const hours = Math.floor(sessionDuration / 3600);
    // const minutes = Math.floor((sessionDuration % 3600) / 60);

    // // Update the timeEntry
    // timeEntry.checkOut = checkOutTime;
    // timeEntry.totalDuration += sessionDuration;  

    // await timeEntry.save();

    // res.status(200).json(new apiResponse(200, {
    //     ...timeEntry.toObject(),
    //     sessionDuration: {
    //         hours,
    //         minutes,
    //         seconds: sessionDuration % 60
    //     }
    // }, "CheckOut successfully."));
})


// For Getting The Daily Time Reports
const getDailyTimeDetails = asyncHandler(async (req, res) => {
    // const userId = req.user.id;
    const records = await userTracker.find().sort({ date: -1 })
    res.status(200).json(new apiResponse(200, records, "Daily Time Report fetched successfully."))
})


// For Getting The Daily Time Report Of User
const getDailyUserTimeDetails = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const records = await userTracker.find({ userId }).sort({ date: -1 })
    res.status(200).json(new apiResponse(200, records, "Daily Time Report fetched successfully."))
})




export {
    checkIn,
    pauseOrResume,
    checkOut,
    getDailyTimeDetails,
    getDailyUserTimeDetails
}