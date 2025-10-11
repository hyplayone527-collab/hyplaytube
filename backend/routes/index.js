import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
