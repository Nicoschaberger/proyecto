import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "products";

const productSchema = mongoose.Schema({
    Nombre: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true,
        unique: true
    },
    Precio: {
        type: String,
        required: true
    },
    Stock: {
        type: String,
        required: true
    },
    Producto: {
        type: String,
        required: true,
        unique: true
    }
});

productSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(productCollection, productSchema);