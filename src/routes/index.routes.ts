import { Router } from "express";
import productoRouter from './producto.routes.js'
import usuarioRouter from "./usuario.routes.js"

const router = Router();

router.use("/productos", productoRouter);
router.use("/usuario", usuarioRouter);


export default router;
