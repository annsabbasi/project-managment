const router = Router();
import { Router } from 'express'
import { verifyCompany } from "../middleware/authMiddleware.js";

import {
    refreshAccessToken,
    getAllData, logoutCompany,
    registerCompany, loginCompany,
    getCompanyData, getCompanyProfile, promoteUser
} from "../controllers/companyController.js";

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
    updateUserSubTask, videosSubTask,
    fetchVideoSubTasks, getUserForSubTask, getUserSubTask,
} from '../controllers/subUserTask.js';

import {
    getAllVideoController,
    getSingleVideoController,
    uploadVideoController
} from '../controllers/cloudinaryUploads/videoUpload.js';

import { upload } from '../middleware/multerMiddleware.js';
import { createSubscriptionCheckout } from '../controllers/userPlanController.js';
import { validateRegisterFieldsCompany } from '../controllers/validations/authValidation.js';



// Authentication
router.route('/signup').post(validateRegisterFieldsCompany(['companyName', 'email', 'password', 'confirmPassword']), registerCompany);
router.route('/login').post(loginCompany);
router.route('/logout').post(verifyCompany(), logoutCompany)
router.route('/get-company-data').get(verifyCompany(), getCompanyData)
// Promote User Role
router.route('/promote-user').post(verifyCompany('admin'), promoteUser)



// Refreshing Token
router.route('/refresh-token').post(refreshAccessToken);
router.route('/get-data').get(getAllData);



// Create Task for Admin
router.route('/create-task').post(verifyCompany(['superadmin', 'admin']), createTask)
router.route('/get-create-task').get(verifyCompany(['admin', 'user']), getCreateTask)
router.route('/get-delete-task/:taskId').delete(verifyCompany('admin'), DeleteTask)
router.route('/get-update-task/:taskId').put(verifyCompany('admin'), UpdateTask)
router.route('/get-create-task/:id').get(verifyCompany(['admin', 'user']), getCreateTaskById)
router.route('/submit-task/:taskId').put(verifyCompany('admin'), submitTask)
router.route('/project-approval/:taskId').put(verifyCompany('admin'), projectApproval)



// UserSub Task
router.route('/create-subTask').post(verifyCompany(['admin', 'user']), createUserTask)
router.route('/get-subTask').get(verifyCompany(['admin', 'user']), getUserSubTask)
router.route('/delete-subTask/:taskId').delete(verifyCompany(['admin', 'user']), deleteUserSubTask)
router.route('/update-subTask/:taskId').put(verifyCompany(['admin', 'user']), updateUserSubTask)
router.route('/get-userOfSubTask/:projectId').get(verifyCompany(['admin', 'user']), getUserForSubTask)



// For The Stripe Session Checkout
router.route('/create-checkout-session').post(verifyCompany(['admin', 'user']), createSubscriptionCheckout)



// Create Docs Link In User SubTask Routes
router.route('/create-docslink').post(verifyCompany(['admin', 'user']), docsSubTask)
router.route('/fetch-docslink').get(verifyCompany(['admin', 'user']), fetchDocsSubTasks)
router.route('/delete-docslink/:id').delete(verifyCompany(['admin', 'user']), deleteDocsSubTask)
// Create Video Link In User SubTask Routes
router.route('/create-videolink').post(verifyCompany(['admin', 'user']), videosSubTask)
router.route('/fetch-videolink').get(verifyCompany(['admin', 'user']), fetchVideoSubTasks)
router.route('/delete-videolink/:id').delete(verifyCompany(['admin', 'user']), deleteVideoSubTask)



// Cloudinary Single Video Upload
router.get('/get-video-upload', verifyCompany(['admin']), getAllVideoController)
router.get('/get-single-video-upload/:videoId', verifyCompany(['admin', 'user']), getSingleVideoController)
router.post(
    '/video-upload',
    verifyCompany(['admin']),
    upload.single('video'),
    uploadVideoController
)




// Testing Purpose
router.route('/testing').get(verifyCompany(['admin', 'user']), getCompanyProfile)



export default router