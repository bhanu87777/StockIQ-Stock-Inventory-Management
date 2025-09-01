import User from "../models/userModel.js";
import {
  isValidEmail,
  isStrongPassword,
  isValidName,
} from "../utils/validators.js";

// for login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Login Failed! User not found.",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Incorrect password!",
      });
    }

    // remove password before sending user data
    const { password: pwd, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      message: "Login Successfully!",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// for register
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Run validations here
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: "Password too weak" });
    }

    if (!isValidName(name)) {
      return res.status(400).json({ message: "Invalid name" });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // save new user
    const newUser = new User({ ...req.body, verified: true });
    await newUser.save();

    res.status(200).json({ message: "New User Added Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
