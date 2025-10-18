import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No autorizado, token requerido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    
    next();
  } catch (error) {
    res.status(401).json({ message: "No autorizado, token inválido" });
  }
};