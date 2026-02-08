import { Router } from "express";
import { crearUsuario, prueba } from "../controllers/usuario.controller.js";

const router = Router();

router.route('/prueba').get(prueba)
router.route('/').post(crearUsuario)

export default router;
