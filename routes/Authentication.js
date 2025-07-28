import express from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { configAWS } from '../config/aws.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure AWS S3 Client using v3
const s3 = await configAWS();

// Register route
router.post("/register", upload.single("image"), async (req, res) => {
    try {
        const { fullname, email, phoneNo, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email,
            phoneNo,
            password: hashedPassword,
        });

        const response = await newUser.save();
        const userWithoutPassword = response.toObject();
        delete userWithoutPassword.password;
        req.session.user = userWithoutPassword;
        res.json({ message: "Registration successful", user: req.session.user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { identity, password } = req.body;
        let user;
        if (identity.includes("@")) {
            user = await User.findOne({ email: identity });
        } else {
            user = await User.findOne({ phoneNo: identity });
        }

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        req.session.user = userWithoutPassword;
        res.json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET current user profile
router.get("/me", (req, res) => {
    if (req.session?.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

// Logout route
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out" });
    });
});

// Edit profile route
router.put("/edit-profile", upload.single("profilePic"), async (req, res) => {
    try {
        const userId = req.session?.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { fullname, email, phoneNo, gender, dob, password } = req.body;

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNo) user.phoneNo = phoneNo;
        if (gender) user.gender = gender;
        if (dob) user.dob = new Date(dob);

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // If a new profile picture is uploaded, update it in S3
        if (req.file) {
            if (user.profilePicUrl) {
                const urlObj = new URL(user.profilePicUrl);
                const key = urlObj.pathname.substring(1); // remove the leading "/"

                const deleteCommand = new DeleteObjectCommand({
                    Bucket: "gramconnectv1",
                    Key: key,
                });

                await s3.send(deleteCommand);
            }
            const key = `users/${Date.now()}_${req.file.originalname}`;
            const putCommand = new PutObjectCommand({
                Bucket: "gramconnectv1",
                Key: key,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            });
            try {
                await s3.send(putCommand);
                // Update the profilePicUrl for the user
                user.profilePicUrl = `https://gramconnectv1.s3.eu-north-1.amazonaws.com/${key}`;
            } catch (error) {
                console.log("Error uploading image to S3:", error);
            }
        }

        await user.save();
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        req.session.user = userWithoutPassword;
        console.log(userWithoutPassword);
        res.status(200).json({ message: "Profile updated successfully", user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete profile picture route
router.delete("/delete-profile-pic", async (req, res) => {
    try {
        const userId = req.session?.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Delete the image from S3 if profilePicUrl exists
        if (user.profilePicUrl) {
            const urlObj = new URL(user.profilePicUrl);
            const key = urlObj.pathname.substring(1); // remove the leading "/"

            const deleteCommand = new DeleteObjectCommand({
                Bucket: "gramconnectv1",
                Key: key,
            });

            await s3.send(deleteCommand);
        }

        // Remove the profilePicUrl from the user document
        user.profilePicUrl = undefined;
        await user.save();
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        req.session.user = userWithoutPassword;

        res.status(200).json({
            message: "Profile picture deleted successfully",
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
