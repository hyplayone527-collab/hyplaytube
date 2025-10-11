import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

// Simulación de base de datos (puedes reemplazar con MongoDB, PostgreSQL, etc.)
const users = [
  { id: 1, email: "demo@novastream.com", password: bcrypt.hashSync("123456", 10) },
];

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", {
    expiresIn: "1h",
  });

  res.json({ message: "Login exitoso", token });
});

export default router;
