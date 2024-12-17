const router = Router();
import { Router } from 'express'
import { verifyUser } from "../middleware/authMiddleware.js";

import {
    refreshAccessToken,
    getAllData, logoutUser,
    registerUser, loginUser,
    getUserData, getUserProfile
} from "../controllers/userController.js";

import {
    getCreateTaskById,
    DeleteTask, UpdateTask,
    createTask, getCreateTask,
    submitTask, projectApproval,
} from '../controllers/adminTask.js';

import {
    createUserTask, deleteDocsSubTask,
    deleteUserSubTask, deleteVideoSubTask,
    docsSubTask, fetchDocsSubTasks,
    fetchVideoSubTasks, getUserSubTask,
    updateUserSubTask, videosSubTask
} from '../controllers/subUserTask.js';

import { createSubscriptionCheckout } from '../controllers/userPlanController.js';
import { validateRegisterFields } from '../controllers/validations/authValidation.js';



// Authentication
router.route('/signup').post(validateRegisterFields(['name', 'email', 'password', 'confirmPassword']), registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyUser(), logoutUser)
router.route('/get-user-data').get(verifyUser(), getUserData)



// Refreshing Token
router.route('/refresh-token').post(refreshAccessToken);
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
router.route('/update-subTask/:taskId').put(verifyUser(['admin', 'user']), updateUserSubTask)



// For The Stripe Session Checkout
router.route('/create-checkout-session').post(verifyUser(['admin', 'user']), createSubscriptionCheckout)



// Create Docs Link In User SubTask Routes
router.route('/create-docslink').post(verifyUser(['admin', 'user']), docsSubTask)
router.route('/fetch-docslink').get(verifyUser(['admin', 'user']), fetchDocsSubTasks)
router.route('/delete-docslink/:id').delete(verifyUser(['admin', 'user']), deleteDocsSubTask)
// Create Video Link In User SubTask Routes
router.route('/create-videolink').post(verifyUser(['admin', 'user']), videosSubTask)
router.route('/fetch-videolink').get(verifyUser(['admin', 'user']), fetchVideoSubTasks)
router.route('/delete-videolink/:id').delete(verifyUser(['admin', 'user']), deleteVideoSubTask)


// Testing Purpose
router.route('/testing').get(verifyUser(['admin', 'user']), getUserProfile)



export default router