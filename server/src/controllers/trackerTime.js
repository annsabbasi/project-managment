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

    // Checking if user has already checked in today
    if (timeEntry) {
        throw new apiError(404, "You already have checkedIn today.")
    }

    if (!timeEntry) {
        timeEntry = new userTracker({
            userId,
            date: today,
            checkIn: new Date(),
            isRunning: true,
        });
        console.log("CheckIn for the !timeEntry", timeEntry)
    } else {
        timeEntry.isRunning = true;
        timeEntry.checkIn = new Date();
    }
    await timeEntry.save();
    res.status(200).json(new apiResponse(200, timeEntry, 'CheckedIn successfully.'));
})


// For The User Continous Time
const getElapsedTime = asyncHandler(async (req, res) => {
    let timer = await userTracker.findOne({ userId: req.user.id, date: moment().format('YYYY-MM-DD') });
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
        elapsedTime
    }, "Elapsed time fetched successfully."));
});


// Pause or Resume Timer
const pauseOrResume = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');

    let timeEntry = await userTracker.findOne({ userId, date: today });

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

        // const pauseDuration = Math.floor((Date.now() - timeEntry.lastPaused) / 1000);
        const pauseDuration = Math.floor((new Date() - timeEntry.lastPaused) / 1000);
        timeEntry.pausedDuration += pauseDuration;

        // Adjust checkIn time to compensate for the paused duration
        if (timeEntry.checkIn) {
            timeEntry.checkIn = new Date(timeEntry.checkIn.getTime() + pauseDuration * 1000);
        }

        timeEntry.isRunning = true;
        timeEntry.lastPaused = null;
        // console.log("UNPaused", pauseDuration)
    }

    await timeEntry.save();
    // console.log("timeEntry saved for the pause and resume", timeEntry)
    res.status(200).json(new apiResponse(200, timeEntry, timeEntry.isRunning ? "Resumed successfully." : "Paused successfully."));
});


// For The User CheckOut
const checkOut = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD')

    let timeEntry = await userTracker.findOne({ userId, date: today });
    if (!timeEntry) {
        throw new apiError(404, `No CheckIn was found for ${today}`)
    }
    // if (timeEntry.isCheckedOut) {
    //     throw new apiError(404, 'You already have checkout for today.')
    // }
    if (timeEntry.isRunning) {
        throw new apiError(410, "Timer is Resumed. Pause it first to check out.")
    }

    const checkOutTime = new Date();
    // const sessionDuration = Math.floor((checkOutTime - timeEntry.checkIn) / 1000);
    const sessionDuration = timeEntry.totalDuration + Math.floor((checkOutTime - timeEntry.checkIn) / 1000);


    timeEntry.checkOut = checkOutTime;
    timeEntry.totalDuration = sessionDuration;
    timeEntry.isCheckedOut = true;
    timeEntry.isRunning = false;
    // timeEntry.totalDuration += sessionDuration;
    // console.log("CheckOut TotalDuration Check", timeEntry)
    await timeEntry.save();
    res.status(200).json(new apiResponse(200, timeEntry, "CheckOut successfully."))
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
    getDailyUserTimeDetails,
    getElapsedTime
}
// pauseOrResume

// if (timeEntry.isPaused) {
//     const pausedDuration = Math.floor((new Date() - timeEntry.lastPaused) / 1000);
//     if (!timeEntry.lastPaused) {
//         throw new apiError(500, "No valid paused time found.");
//     }
//     timeEntry.totalDuration += pausedDuration;
//     timeEntry.isPaused = false;
//     timeEntry.lastPaused = new Date();
// } else {
//     timeEntry.isPaused = true;
//     timeEntry.lastPaused = new Date();
// }



// CheckOut
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

