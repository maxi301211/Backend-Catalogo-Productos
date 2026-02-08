import { Router } from "express";
import { crearProducto, prueba } from "../controllers/producto.controller.js";

const router = Router();

router.route('/prueba').get(prueba)
router.route('/').post(crearProducto)

export default router;
