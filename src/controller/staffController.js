const staffService = require("../service/staffService");

const registerStaff = async (req, res, next) => {
  try {
    const staff = await staffService.registerStaffService(req.body);

    return res.status(201).json({
      success: true,
      message: "Staff registered successfully",
      data: staff,
    });
  } catch (error) {
    next(error);
  }
};

const loginStaff = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await staffService.loginStaffService(
      email,
      password
    );

    res.cookie("token", result.token, {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result.staff,
    });
  } catch (error) {
    next(error);
  }
};

const logoutStaff = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerStaff,
  loginStaff, logoutStaff
};