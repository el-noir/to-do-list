import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
}, {timestamps: true});

export const User = mongoose.model("User", UserSchema);
