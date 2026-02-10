import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    maxLength: 100,
    minLength: 2,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 50,
    max: 1000000,
  },
  categoria: {
    type: String,
    required: true,
    enum: ["Infusiones", "Batidos", "Dulce", "Salado"],
  },
  descripcion_breve: {
    type: String,
    required: true,
    maxLength: 250,
    minLength: 5,
  },
  descripcion_amplia: {
    type: String,
    required: true,
    maxLength: 500,
    minLength: 10,
  },
  imagen: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) =>
        /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v),
    },
  },
});

const Producto = mongoose.model("producto", productoSchema);

export default Producto;
