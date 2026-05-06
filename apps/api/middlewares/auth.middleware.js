import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Not authorized as an admin" });
      }
      req.admin = decoded;
      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
};
export default protect;
