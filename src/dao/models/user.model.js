import mongoose from "mongoose";

const userCollection = "users";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.ObjectId,
        ref: "carts"
    },
    rol: {
        type: String,
        default: "user"
    },
    tokenPassword: {
        type: Object,
    },
    documents: {
        type: Array,
        name: {
            type: String,
        },
        reference: {
            type: String,
        }
    },
    last_connection: {
        type: String,
    }
});

export const userModel = mongoose.model(userCollection, userSchema);