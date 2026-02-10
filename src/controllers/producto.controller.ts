import type { Request, Response } from "express";
import Producto from "../models/producto.js";

export const prueba = (req: Request, res: Response) => {
  res.status(200);
  res.send("Este es un mensaje desde el contralodor");
};

export const crearProducto = async (req: Request, res: Response) => {
  try {
    // console.log(req);
    console.log(req.body);
    // 1- validar los datos del req.body
    // 2- crear el objeto en la base de datos
    const productoNuevo = new Producto(req.body);
    await productoNuevo.save();
    // 3- enviar el mensaje de respuesta
    res.status(201).json({ mensaje: "El mensaje fue creado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el producto." });
  }
};
