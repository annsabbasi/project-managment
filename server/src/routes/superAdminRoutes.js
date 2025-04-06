import express from "express";
import {
    createNotification,
    getNotifications,
    deleteNotification,
} from "../controllers/superAdmin/Notifications.js";
import {
    createPlan,
    getPlans,
    getPlanById,
    updatePlan,
    deletePlan,
} from "../controllers/superAdmin/Plans.js";
import {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
} from "../controllers/superAdmin/Subscriptions.js";

import {
    getSettings,
    updateApplicationInfo,
    updateContactInfo,
    updateMaintenance,
} from "../controllers/superAdmin/Settings.js";

import { getDashboardData } from "../controllers/superAdmin/Dashboard.js";
import { updateUser } from "../controllers/superAdmin/Auth.js";
import { verifyUser } from "../middleware/authMiddleware.js";
import { getAllData } from "../controllers/userController.js";

const router = express.Router();
// ----------------------------------
router
    .route("/notifications")
    .post(verifyUser("superadmin"), createNotification)
    .get(verifyUser(["superadmin", "admin"]), getNotifications);
router
    .route("/notifications/:id")
    .delete(verifyUser("superadmin"), deleteNotification);

// ----------------------------------
router.route("/plans").post(verifyUser("superadmin"), createPlan).get(getPlans);

router
    .route("/plans/:id")
    .get(getPlanById)
    .delete(verifyUser("superadmin"), deletePlan);

router.route("/plans/:id/update").put(verifyUser("superadmin"), updatePlan);

// ----------------------------------
router
    .route("/subscriptions")
    .post(verifyUser(["superadmin", "admin"]), createSubscription)
    .get(verifyUser("superadmin"), getSubscriptions);

router
    .route("/subscriptions/:id")
    .get(verifyUser(["superadmin", "admin"]), getSubscriptionById);

router
    .route("/subscriptions/:id/update")
    .put(verifyUser("superadmin"), updateSubscription);
// ----------------------------------
// Get current settings
router.get("/settings", verifyUser("superadmin"), getSettings);

// Update Application Information
router.patch(
    "/settings/application",
    verifyUser("superadmin"),
    updateApplicationInfo
);

// Update Contact Information
router.patch("/settings/contact", verifyUser("superadmin"), updateContactInfo);

// Update Maintenance Settings
router.patch(
    "/settings/maintenance",
    verifyUser("superadmin"),
    updateMaintenance
);

// ----------------------------------
// Dashboard Route
router.get("/dashboard", verifyUser("superadmin"), getDashboardData);
// ----------------------------------
// Users Routes
router.get("/users", verifyUser("superadmin"), getAllData);
router.patch("/users/:id/update", verifyUser("superadmin"), updateUser);

export default router;
