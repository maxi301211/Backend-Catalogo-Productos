import { Router } from "express";
import { crearProducto, obtenerProducto, obtenerProductos, prueba } from "../controllers/producto.controller.js";

const router = Router();

router.route('/prueba').get(prueba)
router.route('/').post(crearProducto).get(obtenerProductos)
router.route('/:id').get(obtenerProducto)

export default router;
