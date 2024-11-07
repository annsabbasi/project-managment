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
import { createTask, getCreateTask, getDeleteTask } from '../controllers/adminTask.js';

// Authentication
router.route('/signup').post(validateRegistration, registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyUser, logoutUser)
router.route('/get-user-data').get(verifyUser, getUserData)

router.route('/refresh-token').get(refreshAccessToken);
router.route('/get-data').get(getAllData);

// Create Task
router.route('/create-task').post(verifyUser, createTask)
router.route('/get-create-task').get(verifyUser, getCreateTask)
router.route('/get-delete-task').get(verifyUser, getDeleteTask)

export default router