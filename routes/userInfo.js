import express from "express";
const router = express.Router();
import User from "../config/userModel.js";
// get a specific user information from the database
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const users = await User.findOne({ where: { username } });
  if (users) {
    return res.status(200).send(users);
  }
  return users;
});

export default router;
