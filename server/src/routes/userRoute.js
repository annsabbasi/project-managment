const router = Router();
import { Router } from "express";
import { verifyUser } from "../middleware/authMiddleware.js";

import {
    refreshAccessToken,
    getAllData,
    logoutUser,
    registerUser,
    loginUser,
    getUserData,
    getUserProfile,
    promoteUser,
    updateUser,
} from "../controllers/userController.js";

import {
    getCreateTaskById,
    DeleteTask,
    UpdateTask,
    createTask,
    getCreateTask,
    submitTask,
    projectApproval,
} from "../controllers/adminTask.js";

import {
    createUserTask,
    deleteDocsSubTask,
    deleteUserSubTask,
    deleteVideoSubTask,
    docsSubTask,
    fetchDocsSubTasks,
    updateUserSubTask,
    videosSubTask,
    fetchVideoSubTasks,
    getUserForSubTask,
    getUserSubTask,
    filterSubTask,
    completeUserSubTask,
    getCompleteUserSubTask,
    subTaskApproval,
} from "../controllers/subUserTask.js";

import {
    getAllVideoController,
    getSingleVideoController,
    uploadVideoController,
} from "../controllers/cloudinaryUploads/videoUpload.js";

import { upload } from "../middleware/multerMiddleware.js";
import { createSubscriptionCheckout } from "../controllers/userPlanController.js";
import { validateRegisterFields } from "../controllers/validations/authValidation.js";
import {
    checkIn,
    checkOut,
    pauseOrResume,
    getElapsedTime,
    getUserTimeProject,
    getUsersTimeProject,
} from "../controllers/trackerTime.js";
import { Timer } from "../models/test.js";
import {
    getAllScreenshotsController,
    getUserScreenShot,
    getUserTrackerStatus,
    uploadScreenshotController,
} from "../controllers/snapShot.js";

// Authentication
router
    .route("/signup")
    .post(
        validateRegisterFields([
            "name",
            "email",
            "password",
            "confirmPassword",
        ]),
        registerUser
    );
router.route("/login").post(loginUser);
router.route("/logout").post(verifyUser(), logoutUser);
router.route("/get-user-data").get(verifyUser(), getUserData);
router.put("/update-user", verifyUser(["admin", "user", "QcAdmin"]), upload.single("profilePicture"), updateUser);

// router.post(
//     "/upload-screenshot",
//     verifyUser(["admin", "user", "QcAdmin"]),
//     upload.single("image"), // Using your Multer setup
//     uploadScreenshotController
// );
// Promote User Role
router.route("/promote-user").post(verifyUser("admin"), promoteUser);

// Refreshing Token
router.route("/refresh-token").post(refreshAccessToken);
router.route("/get-data").get(getAllData);

// Create Task for Admin
router
    .route("/create-task")
    .post(verifyUser(["superadmin", "admin"]), createTask);
router
    .route("/get-create-task")
    .get(verifyUser(["admin", "user"]), getCreateTask);
router
    .route("/get-delete-task/:taskId")
    .delete(verifyUser("admin"), DeleteTask);
router.route("/get-update-task/:taskId").put(verifyUser("admin"), UpdateTask);
router
    .route("/get-create-task/:id")
    .get(verifyUser(["admin", "user"]), getCreateTaskById);
router.route("/submit-task/:taskId").put(verifyUser("admin"), submitTask);
router
    .route("/project-approval/:taskId")
    .put(verifyUser("admin"), projectApproval);

// UserSub Task
router
    .route("/create-subTask")
    .post(verifyUser(["admin", "user"]), createUserTask);
router.route("/get-subTask").get(verifyUser(["admin", "user"]), getUserSubTask);
router
    .route("/complete-subTask/:taskID")
    .patch(verifyUser(["admin", "user"]), completeUserSubTask);
router
    .route("/get-complete-subTask")
    .get(verifyUser(["admin", "user", "QcAdmin"]), getCompleteUserSubTask);
router
    .route("/approve-subTask/:taskID")
    .patch(verifyUser(["admin", "QcAdmin"]), subTaskApproval);
router
    .route("/delete-subTask/:taskId")
    .delete(verifyUser(["admin", "user"]), deleteUserSubTask);
router
    .route("/update-subTask/:taskId")
    .put(verifyUser(["admin", "user"]), updateUserSubTask);
router
    .route("/get-userOfSubTask/:projectId")
    .get(verifyUser(["admin", "user"]), getUserForSubTask);
router
    .route("/search-subTask")
    .get(verifyUser(["admin", "user"]), filterSubTask);

// For The Stripe Session Checkout
router
    .route("/create-checkout-session")
    .post(verifyUser(["admin", "user"]), createSubscriptionCheckout);

// Create Docs Link In User SubTask Routes
router
    .route("/create-docslink")
    .post(verifyUser(["admin", "user"]), docsSubTask);
router
    .route("/fetch-docslink")
    .get(verifyUser(["admin", "user"]), fetchDocsSubTasks);
router
    .route("/delete-docslink/:id")
    .delete(verifyUser(["admin", "user"]), deleteDocsSubTask);
// Create Video Link In User SubTask Routes
router
    .route("/create-videolink")
    .post(verifyUser(["admin", "user"]), videosSubTask);
router
    .route("/fetch-videolink")
    .get(verifyUser(["admin", "user"]), fetchVideoSubTasks);
router
    .route("/delete-videolink/:id")
    .delete(verifyUser(["admin", "user"]), deleteVideoSubTask);

// Cloudinary Single Video Upload
router.get("/get-video-upload", verifyUser(["admin"]), getAllVideoController);
router.get(
    "/get-single-video-upload/:videoId",
    verifyUser(["admin", "user"]),
    getSingleVideoController
);
router.post(
    "/video-upload",
    verifyUser(["admin"]),
    upload.single("video"),
    uploadVideoController
);

// User Tracker Timer Of The SubTask
router.get(
    "/getElapsedTime",
    verifyUser(["admin", "user", "QcAdmin"]),
    getElapsedTime
);
router.post("/checkIn", verifyUser(["admin", "user", "QcAdmin"]), checkIn);
router.put(
    "/pauseOrResume",
    verifyUser(["admin", "user", "QcAdmin"]),
    pauseOrResume
);
router.put("/checkOut", verifyUser(["admin", "user", "QcAdmin"]), checkOut);
router.get(
    "/getUserTimeProject",
    verifyUser(["admin", "user", "QcAdmin"]),
    getUserTimeProject
);
router.get(
    "/getUsersTimeProject",
    verifyUser(["admin", "user", "QcAdmin"]),
    getUsersTimeProject
);
// router.get('/getDailyTimeDetails', verifyUser(['admin', 'user', 'QcAdmin']), getDailyTimeDetails)
// router.get('/getDailyUserTimeDetails/:userId', verifyUser(['admin', 'user', 'QcAdmin']), getDailyUserTimeDetails)

// Testing PURPOSE FOR THE SNAPSHOTS
// Cloudinary Screenshot Upload
router.post(
    "/upload-screenshot",
    verifyUser(["admin", "user", "QcAdmin"]),
    upload.single("image"), // Using your Multer setup
    uploadScreenshotController
);
router.get(
    "/get-user-screenshots",
    verifyUser(["admin", "user"]),
    getUserScreenShot
);
router.get(
    "/get-all-screenshots",
    verifyUser(["admin", "user"]),
    getAllScreenshotsController
);
router.get(
    "/check-status",
    verifyUser(["user", "admin"]),
    getUserTrackerStatus
);

// Testing Purpose
router.route("/testing").get(verifyUser(["admin", "user"]), getUserProfile);
router.get("/timer", async (req, res) => {
    try {
        let timer = await Timer.findOne({});
        if (!timer) {
            timer = new Timer();
            await timer.save();
        }

        // If the timer is running, calculate the elapsed time
        let elapsedTime = 0;
        console.log("timer Gpt", timer);
        if (timer.startTime && timer.isRunning) {
            elapsedTime = Math.floor(
                (Date.now() - new Date(timer.startTime)) / 1000
            );
        }

        res.json({
            isRunning: timer.isRunning,
            isCheckedOut: timer.isCheckedOut,
            elapsedTime,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Timer (Check-In)
router.post("/timer/start", async (req, res) => {
    try {
        let timer = await Timer.findOne({});
        if (!timer) {
            timer = new Timer();
        }

        timer.startTime = new Date();
        timer.isRunning = true;
        timer.isCheckedOut = false;
        await timer.save();
        console.log("checkIn timer", timer);
        res.json({ message: "Timer started", timer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Stop Timer (Pause)
router.put("/timer/pause", async (req, res) => {
    try {
        let timer = await Timer.findOne({});
        if (timer) {
            timer.isRunning = false;
            await timer.save();
        }
        console.log("pause timer", timer);
        res.json({ message: "Timer paused", timer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Resume Timer
router.put("/timer/resume", async (req, res) => {
    try {
        let timer = await Timer.findOne({});
        if (timer && !timer.isCheckedOut) {
            timer.isRunning = true;
            await timer.save();
        }
        console.log("resume timer", timer);
        res.json({ message: "Timer resumed", timer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Checkout (Stop and Reset Timer)
router.put("/timer/checkout", async (req, res) => {
    try {
        let timer = await Timer.findOne({});
        if (timer) {
            timer.startTime = null;
            timer.isRunning = false;
            timer.isCheckedOut = true;
            await timer.save();
        }
        console.log("checkOut timer", timer);
        res.json({ message: "Checked out", timer });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
