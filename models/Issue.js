import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["reported", "in-progress", "resolved"],
        default: "reported",
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: {
        name: { type: String, required: false },
        img: {
            data: Buffer,
            contentType: String
        },
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Issue = mongoose.model("Issue", issueSchema);
