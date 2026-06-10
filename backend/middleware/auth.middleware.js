import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" })
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Unauthorized: Invalid token" });

    req.userId = decoded.id || decoded.userId;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
    }

    next();

  }
  catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}