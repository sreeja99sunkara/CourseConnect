const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.header("authorization");

if (!authHeader) {
  return res.status(401).json({ message: "No token" });
}

const token = authHeader.split(" ")[1]; // ✅ extract token

if (!token) {
  return res.status(401).json({ message: "Invalid token format" });
}

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};