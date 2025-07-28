import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
    },
    dob: {
        type: Date,
    },
    // Instead of storing the image in MongoDB, store the S3 URL
    profilePicUrl: {
        type: String,
    }
});

export const User = mongoose.model("User", userSchema);
