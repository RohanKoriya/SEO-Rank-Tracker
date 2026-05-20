import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import User from "../models/User";

//Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name, !email, !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })

    if (newUser) {

      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);


      res.status(201).json({ success: true, token, user, message: "Registered successfully" })
    }

  } catch (error) {
    console.log("Error in register controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//Login
export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ success: false, message: "Invalid Credentials" })

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Invalid Credentials" })

    generateToken(user._id, res)

    res.status(200).json({
      success: false,
      token,
      user,
      message: "Login successfully"
    });

  } catch (error) {
    console.error("Error in login controller: ", error);
    res.status(500).json({ success: false, message: "Internal server error" })

  }
};

//get current user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req, userId).select("-password");

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" })
    }

    res.json({ success: true, user });

  } catch (error) {
    console.error("Error in getting user: ", error);
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}
