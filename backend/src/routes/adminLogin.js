import express from "express";
import adminLogin from "../controllers/adminLogin";

const router = express.Router();
router.route("/").post(adminLogin.login);
export default router;
