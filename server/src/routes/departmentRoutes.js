import {
    addDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    getNumberOfUsers,
} from "../controllers/Department.js";

const router = Router();
import { Router } from "express";
import { verifyUser } from "../middleware/authMiddleware.js";

// Department Routes
router
    .route("/add-department")
    .post(verifyUser("admin", "user"), addDepartment);
router.route("/get-departments").get(getDepartments);
router
    .route("/get-department/:id")
    .get(verifyUser(["admin", "user"]), getDepartmentById);
router
    .route("/update-department/:id")
    .put(verifyUser("admin"), updateDepartment);
router
    .route("/delete-department/:id")
    .delete(verifyUser("admin"), deleteDepartment);
router
    .route("/get-number-of-users/:id")
    .get(verifyUser(["admin", "user"]), getNumberOfUsers);

export default router;
