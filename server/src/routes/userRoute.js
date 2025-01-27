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
    getSingleUploadVideoController,
    getSingleRecordVideoController,
    uploadVideoController,
} from "../controllers/cloudinaryUploads/videoUpload.js";

import { upload } from "../middleware/multerMiddleware.js";
import { createSubscriptionCheckout } from "../controllers/userPlanController.js";
import { validateRegisterFields } from "../controllers/validations/authValidation.js";

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
    getSingleUploadVideoController
);
router.post(
    "/video-upload",
    verifyUser(["admin"]),
    upload.single("video"),
    uploadVideoController
);
router.get(
    "/get-single-video-record/:videoId",
    verifyUser(["admin", "user"]),
    getSingleRecordVideoController
);

// Testing Purpose
router.route("/testing").get(verifyUser(["admin", "user"]), getUserProfile);

export default router;
