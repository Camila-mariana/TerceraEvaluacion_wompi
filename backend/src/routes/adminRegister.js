import express from "express";
import adminRegister from "../controllers/adminRegister.js";

const router = express.Router();
router.route("/").post(adminRegister.post);
router.route("/verify").post(adminRegister.verify);
