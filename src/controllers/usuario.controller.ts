import type { Request, Response } from "express";

export const prueba = (req: Request, res: Response) => {
  res.status(200);
  res.send("Este es un mensaje desde el contralodor de usuario");
};

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    // console.log(req);
    console.log(req.body);
    // 1- validar los datos del req.body
    // 2- crear el objeto en la base de datos 
    // 3- enviar el mensaje de respuesta
    res.send("desde la logica de crear un usuario");
  } catch (error) {
    console.error(error);
  }
};

