import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminLogin from "./src/routes/adminLogin.js";
import customerLogin from "./src/routes/customerLogin.js";
import adminRegister from "./src/routes/adminRegister.js";
import customerRegister from "./src/routes/customerRegister.js";
import wompi from "./src/routes/wompi.js";
import ticketPurchase from "./src/routes/ticketPurchase.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/adminLogin", adminLogin);
app.use("/api/customerLogin", customerLogin);
app.use("/api/adminRegister", adminRegister);
app.use("/api/customerRegister", customerRegister);
app.use("/api/wompi", wompi);
app.use("/api/ticketPurchase", ticketPurchase);

export default app;
