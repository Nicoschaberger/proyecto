import mongoose from "mongoose";

const userCollection = 'user';

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
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    documents: {
        name: String,
        reference: String
    },
    last_connection: {
        type: Date,
        default: Date.now
    },
});

export const userModel = mongoose.model(userCollection, userSchema);