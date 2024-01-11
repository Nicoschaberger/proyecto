import mongoose from "mongoose";

const chatCollection = "chat";

const chatSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    mensaje: {
        type: String,
        require: true
    }
});

export const chatModel = mongoose.model(chatCollection, chatSchema);