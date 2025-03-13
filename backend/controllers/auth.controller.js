import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).send("Email already used");
    }
    const user = await User.create({ name, email, password });

    res.status(201).json({ user, message: "User create successfully" });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  res.send("Log in route called");
};
export const logout = async (req, res) => {
  res.send("Log out route called");
};
