import { Router } from "express";
import { prueba } from "../controllers/producto.controller.js";

const router = Router();

router.route('/prueba').get(prueba)

export default router;
