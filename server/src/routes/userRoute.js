import { Router } from 'express'
const router = Router();
import validateRegistration from "../middleware/validateRegistrationMiddleware.js";
import { verifyUser } from "../middleware/authMiddleware.js";

import {
    registerUser,
    loginUser,
    getAllData,
    logoutUser,
    refreshAccessToken,
    getUserData
} from "../controllers/userController.js";

import {
    createTask,
    getCreateTask,
    DeleteTask,
    UpdateTask,
    getCreateTaskById,
    submitTask,
    projectApproval
} from '../controllers/adminTask.js';
import { createUserTask, deleteUserSubTask, getUserSubTask } from '../controllers/subUserTask.js';


// Authentication
router.route('/signup').post(validateRegistration, registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyUser(), logoutUser)
router.route('/get-user-data').get(verifyUser(), getUserData)



// Refreshing Token
router.route('/refresh-token').get(refreshAccessToken);
router.route('/get-data').get(getAllData);



// Create Task for Admin
router.route('/create-task').post(verifyUser(['superadmin', 'admin']), createTask)
router.route('/get-create-task').get(verifyUser('admin'), getCreateTask)
router.route('/get-delete-task/:taskId').delete(verifyUser('admin'), DeleteTask)
router.route('/get-update-task/:taskId').put(verifyUser('admin'), UpdateTask)
router.route('/get-create-task/:id').get(verifyUser(['admin', 'user']), getCreateTaskById)
router.route('/submit-task/:taskId').put(verifyUser('admin'), submitTask)
router.route('/project-approval/:taskId').put(verifyUser('admin'), projectApproval)



// UserSub Task
router.route('/create-subTask').post(verifyUser(['admin', 'user']), createUserTask)
router.route('/get-subTask').get(verifyUser(['admin', 'user']), getUserSubTask)
router.route('/delete-subTask/:taskId').delete(verifyUser(['admin', 'user']), deleteUserSubTask)

export default router