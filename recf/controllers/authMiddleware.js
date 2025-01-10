const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
	const token = req.headers["authorization"];
	if (!token) {
		return res.status(403).json({message: "No token provided"});
	}
	try {
		const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
		req.user = decoded; // Attach decoded user data to the request object
		next(); // Continue to the next middleware or route handler
	} catch (err) {
		return res.status(401).json({message: "Invalid or expired token"});
	}
};

module.exports = verifyToken;
