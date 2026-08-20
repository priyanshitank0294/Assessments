const jwt = require("jsonwebtoken");
const Staff = require("../model/staffModel");

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Cookie se token lo
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 2. JWT verify karo
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.access_key);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 3. decoded.id se fresh staff DB se lao
    const staff = await Staff.findById(decoded.id);

    // 4. Staff nahi mila
    if (!staff) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // 5. Fresh staff ko req.user mein store karo
    req.user = staff;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;