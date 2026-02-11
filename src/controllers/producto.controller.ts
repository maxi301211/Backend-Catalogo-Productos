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
    res.status(201).json({ mensaje: "El producto fue creado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el producto." });
  }
};

export const obtenerProductos = async (req: Request, res: Response) => {
  try {
    // 1- Buscar los productos ne la base de datos.
    const listaProductos = await Producto.find();
    // 2- responder con el status adecuado 200 y devolver los productos.
    res.status(200).json(listaProductos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los productos" });
  }
};

export const obtenerProductoPorID = async (req: Request, res: Response) => {
  try {
    // 1- Buscar el producto por el campo del ID.
    const productoBuscado = await Producto.findById(req.params.id);
    // 2- Chequear que encontre el producto, si no existe enviar un mensaje de error.
    if (!productoBuscado) {
      return res.status(404).json({ mensaje: "Prodcuto no encontrado." });
    }
    // 3- Enviar el producto en la respuesta.
    res.status(200).json(productoBuscado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener el producto por ID" });
  }
};
