import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
// Middleware to authenticate JWT
// const authenticateJWT = (req, res, next) => {
//   const token =
//     req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1]; // Get token from Authorization header

  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user; // Attach user info to request object
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
export default authenticateJWT;
// export const  = (req, res, next) => {
//   if (req.headers['authorization']) {
//     next(); // Proceed to the next middleware or route handler
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// };
