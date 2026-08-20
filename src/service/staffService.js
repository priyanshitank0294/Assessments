const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Staff = require("../model/staffModel");

const registerStaffService = async (staffData) => {
  const { name, email, password, department } = staffData;

  const existingStaff = await Staff.findOne({ email });

  if (existingStaff) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  // Password ko hash nahi karna.
  // staffModel ka pre-save hook automatically hash karega.
  const staff = await Staff.create({
    name,
    email,
    password,
    department,
  });

  // Response mein password nahi bhejna
  const staffResponse = staff.toObject();
  delete staffResponse.password;

  return staffResponse;
};

const loginStaffService = async (email, password) => {
  const staff = await Staff.findOne({ email });

  // Email nahi mila ya password galat:
  // dono ke liye same message
  if (!staff) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    staff.password
  );

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: staff._id,
      department: staff.department,
    },
    process.env.access_key,
    {
      expiresIn: "1h",
    }
  );

  return {
    staff: {
      id: staff._id,
      name: staff.name,
      email: staff.email,
      department: staff.department,
    },
    token,
  };
};

module.exports = {
  registerStaffService,
  loginStaffService,
};