import express from "express";
import customerLogin from "../controllers/customerLogin.js";

const router = express.Router();
router.route("/").post(customerLogin.login);
export default router;
