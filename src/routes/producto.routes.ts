import { Router } from "express";
import {
  borrarProductoPorID,
  crearProducto,
  editarProductoPorID,
  obtenerProductoPorID,
  obtenerProductos,
  prueba,
} from "../controllers/producto.controller.js";

const router = Router();

router.route("/prueba").get(prueba);
router.route("/").post(crearProducto).get(obtenerProductos);
router.route("/:id").get(obtenerProductoPorID).delete(borrarProductoPorID).put(editarProductoPorID);

export default router;
