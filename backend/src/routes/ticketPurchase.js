import express from "express";
import ticketPurchasesController from "../controllers/ticketPurchase.js";
import { validateAuthCookie } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
.get(validateAuthCookie(["customer", "admin"]), ticketPurchasesController.getTicketPurchases)
.post(validateAuthCookie(["customer", "admin"]), ticketPurchasesController.insertTicketPurchase)

router.route("/:id")
.put(validateAuthCookie(["customer", "admin"]), ticketPurchasesController.updateTicketPurchase)
.delete(validateAuthCookie(["customer", "admin"]), ticketPurchasesController.deleteTicketPurchase)

export default router;
