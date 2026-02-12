import express, { type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB || "").then(() => {
  console.info("Base de datos conectada.");
}).catch((error) => {
  console.error("Error conectando a MongoDB:", error);
});

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Servir archivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

// Importar rutas
import productoRouter from "../src/routes/producto.routes.js";
import usuarioRouter from "../src/routes/usuario.routes.js";

// Rutas
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "API del catálogo funcionando" });
});

app.use("/api/productos", productoRouter);
app.use("/api/usuario", usuarioRouter);

// Exportar para Vercel
export default app;
