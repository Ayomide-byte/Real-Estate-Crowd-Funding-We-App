import express from "express";
import bodyParser from "body-parser";
import { connectMySQL } from "../config/database.js";
import loginRoute from "../routes/loginRoute.js";
import registerRoute from "../routes/registerRoute.js";
import userInfoRoute from "../routes/userInfo.js";
import authenticateJWT from "../middleware/authMiddliware.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const localhost = process.env.HOST;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = async () => {
  await connectMySQL();
  // Routes
  app.use("/api/register", registerRoute);
  app.use("/api/login", loginRoute);
  app.use("/api/info/", userInfoRoute); //Add the specfc username params to this endpoint (/api/info/the_username)

  // Protected route
  app.get("/api/dashboard", authenticateJWT, (req, res) => {
    res.send(`Hello ${req.user.email}, this is a protected route!`);
  });

  // Start server
  app.listen(port, () => {
    console.log("Server started on http://", localhost, ":", port);
  });
};

startServer();
