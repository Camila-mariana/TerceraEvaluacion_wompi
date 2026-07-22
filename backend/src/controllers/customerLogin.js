import customerModel from "../models/customer.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

const loginCustomer = {};
loginCustomer.login = async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  try {
    const customerFound = await customerModel.findOne({ email });
    if (!customerFound) {
      return res.status(400).json({ message: "Customer not found" });
    }

    if (customerFound.timeOut && customerFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Cuenta bloqueada" });
    }
    const isMatch = await bcrypt.compare(password, customerFound.password);
    if (!isMatch) {
      customerFound.LoginAttempts = (customerFound.LoginAttempts || 0) + 1;

      if (customerFound.LoginAttempts >= 5) {
        customerFound.timeOut = Date.now() + 5 * 60 * 1000;
        customerFound.LoginAttempts = 0;

        await customerFound.save();
        return res
          .status(403)
          .json({ message: "Cuenta bloqueada por intetos fallidos" });
      }

      await customerFound.save();

      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    customerFound.LoginAttempts = 0;
    customerFound.timeOut = null;
    const token = jsonwebtoken.sign(
      { id: customerFound._id, userType: "customer" },
      config.jwt.secret,
      { expiresIn: "30d" },
    );
    res.cookie("authCookie", token);

    return res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default loginCustomer;
