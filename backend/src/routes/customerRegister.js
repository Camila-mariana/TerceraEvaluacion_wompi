import express from "express";
import customerRegister from "../controllers/customerRegister.js";

const router = express.Router();
router.route("/").post(customerRegister.post);
router.route("/verify").post(customerRegister.verify);
