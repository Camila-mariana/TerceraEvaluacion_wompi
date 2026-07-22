import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

export const validateAuthCookie = (allowebTypes = []) => {
  return (req, res, next) => {
    try {
      const { authCookie } = req.cookies;
      if (!authCookie) {
        return res
          .status(403)
          .json({ message: "no cookies found, authorization require" });
      }
      const decoded = jsonwebtoken.verify(authCookie, config.jwt.secret);
      if (!allowebTypes.includes(decoded.userType)) {
        return res.status(401).json({
          message: "Acces denied",
        });
      }
      next();
    } catch (error) {
      console.log("error" + error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
};
