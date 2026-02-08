import type { Request, Response } from "express";

export const prueba = (req: Request, res: Response) => {
  res.status(200);
  res.send("Este es un mensaje desde el contralodor");
};

