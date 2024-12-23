// Importing modules
import express from "express";
import bcrypt from "bcrypt";
import User from "../config/userModel.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

// register
router.post(
  "/",
  // This will check for the username, email and password validation
  [
    body("username")
      .notEmpty()
      .withMessage("Username is required.")
      .isString()
      .matches(/^(?=.*[a-zA-Z])[a-zA-Z\s]+$/)
      .withMessage("Username must contain only letters."),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          throw new Error("Email already exists.");
        }
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],

  // Sends error messages if the validation fails
  async (req, res) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!username || !email || !password) {
      return res.status(400).send({ message: "All fields are required." });
    }

    try {
      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      console.log(user);

      res.status(201).send(username + " has registered successfully!");
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error registering user.", error: error.message });
    }
  }
);

export default router;
