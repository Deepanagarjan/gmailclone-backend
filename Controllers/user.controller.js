import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register a new user
export const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists with this email", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profilePhoto = `https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fkirin_%2Fcircle-profile%2F&psig=AOvVaw3YbQj7NSpPJ3NmMjcyZW6H&ust=1727278174877000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiFwufy24gDFQAAAAAdAAAAABAR`;  // Sample profile photo URL
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            profilePhoto
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
}

// Login a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Incorrect email or password", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Incorrect email or password", success: false });
        }

        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,  // 1 day in milliseconds
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',  // Use secure cookie in production
        }).json({
            message: `${user.fullname} logged in successfully.`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
}

// Logout a user
export const logout = async (req, res) => {
    try {
        // Clear the token cookie by setting it with an empty value and a very short expiry time.
        return res.status(200).cookie('token', '', {
            maxAge: 0,            // Set the cookie to expire immediately
            httpOnly: true,       // Ensure the cookie is only accessible via HTTP (not JavaScript)
            sameSite: 'strict',   // Ensure CSRF protection by allowing the cookie to be sent only for same-site requests
            secure: process.env.NODE_ENV === 'production' , // Only send cookie over HTTPS in production
        }).json({
            message: 'Logged out successfully.',
            success: true
        });
    } catch (error) {
        console.log('Logout Error:', error);
        res.status(500).json({ message: 'Server error during logout', success: false });
    }
};

// const API_BASE_URL = process.env.NODE_ENV === 'production'
//     ? 'https://gmailclone-frontend.vercel.app/'
//     : '';

// // Use API_BASE_URL in your fetch requests
// const registerUser = async (userData) => {
//     const response = await fetch(`${API_BASE_URL}/user/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//     });
//     return await response.json();
// };
