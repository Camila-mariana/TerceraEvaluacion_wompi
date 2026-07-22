import adminModel from "../models/admin.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

const Loginadmin = {};
Loginadmin.login = async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  try {
    const adminFound = await adminModel.findOne({ email });
    if (!adminFound) {
      return res.status(400).json({ message: "admin not found" });
    }

    if (adminFound.timeOut && adminFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Cuenta bloqueada" });
    }
    const isMatch = await bcrypt.compare(password, adminFound.password);
    if (!isMatch) {
      adminFound.LoginAttempts = (adminFound.LoginAttempts || 0) + 1;

      if (adminFound.LoginAttempts >= 5) {
        adminFound.timeOut = Date.now() + 5 * 60 * 1000;
        adminFound.LoginAttempts = 0;

        await adminFound.save();
        return res
          .status(403)
          .json({ message: "Cuenta bloqueada por intetos fallidos" });
      }

      await adminFound.save();

      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    adminFound.LoginAttempts = 0;
    adminFound.timeOut = null;
    const token = jsonwebtoken.sign(
      { id: adminFound._id, userType: "admin" },
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

export default Loginadmin;
