import express from "express";
import wompiController from "../controllers/wompi.js";

const router = express.Router()

router.route("/toke").post(wompiController.generarToken)
router.route("/paymentTest").post(wompiController.paymentTest)
router.route("/payment3DS").post(wompiController.payment3DS)

export default router