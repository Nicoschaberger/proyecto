import mongoose from "mongoose";

const cartCollection = 'cart'

const cartSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    precio: {
        type: String,
        require: true
    }
});

export const cartModel = mongoose.model(cartCollection, cartSchema)