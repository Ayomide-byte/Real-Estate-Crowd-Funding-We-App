import User from "../config/userModel.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
dotenv.config();
const router = express.Router();
const jwtpass = process.env.JWT_TOKEN;
// login routes
router.post(
  "/",
  // This will check for the email and password validation
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required." });
    }

    try {
      // Find the user by email in the database and check if the password matches the hashed password in the database.
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .send(`This ${email} user does not exist, please try to register`);
      }

      const token = jwt.sign({ id: user.id }, jwtpass, {
        expiresIn: "1h",
      });
      res.send({ message: "Login successful!", token });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error logging in.", error: error.message });
    }
  }
);

export default router;
