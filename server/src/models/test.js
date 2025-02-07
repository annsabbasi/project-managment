// models/Timer.js
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const timerSchema = new mongoose.Schema({
    startTime: { type: Date, default: null }, // Stores the start time when user checks in
    isRunning: { type: Boolean, default: false },
    isCheckedOut: { type: Boolean, default: false },
});

const Timer = mongoose.model("Timer", timerSchema);

export { Timer };
 