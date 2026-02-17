import mongoose from "mongoose";
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const TOKEN_EXPIRES_IN = "24h";
const JWT_SECRET = "jwtsecret";

// Register
export async function Register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "invalid email",
      });
    }
    const exists = await User.findOne({ email }).lean();
    if (exists)
      return res
        .status(409)
        .json({ success: false, message: "user already exists" });

    const newId = new mongoose.Types.ObjectId();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      _id: newId,
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not found on server");

    const token = jwt.sign({ id: newId.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfulley",
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("register error", err);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
}

//Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "invalid mail",
      });

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    return res.status(201).json({
      success: true,
      message: "login successfulley",
      token,
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("register error", err);
    return res.status(500).json({
      success: false,
      message: "login error",
    });
  }
}
