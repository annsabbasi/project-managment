const router = Router();
import { Router } from "express";
import loginSuperAdmin from "../controllers/superAdmin/Auth.js"


router.route("/superadmin/login").post(loginSuperAdmin);