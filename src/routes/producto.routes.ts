import { Router } from "express";
import { crearProducto, obtenerProducto, prueba } from "../controllers/producto.controller.js";

const router = Router();

router.route('/prueba').get(prueba)
router.route('/').post(crearProducto).get(obtenerProducto)

export default router;
