const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = asyncHandler(async (req, res) => { // async handler allows you to write async route handlers without the need for explicit try/catch blocks
  const { name, email, password, age, gender, address } = req.body;

  //Validation
  if (!name || !email || !password || !age || !gender || !address) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be atleast 8 characters");
  }
  // Check if user email already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    age,
    gender,
    address
  });

  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });
  // console.log(token)
  if (user) {
    const { _id, name, email, age, gender, address, status, appliedPlans } = user;
    res.status(201).json({
      _id,
      name,
      email,
      age,
      gender,
      address,
      token,
      status,
      appliedPlans
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password.");
  }

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found. Please signup.");
  }

  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (user && passwordIsCorrect) {
    const { _id, name, email, age, gender, address, status, appliedPlans} = user;
    res.status(200).json({
      _id,
      name,
      email,
      age,
      gender,
      address,
      token,
      status,
      appliedPlans
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({
    message: "Successfully Logged Out",
  });
});

// Get User Data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, age, gender, address, status, appliedPlans } = user;
    res.status(200).json({
      _id,
      name,
      email,
      age,
      gender,
      address,
      status,
      appliedPlans
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }

  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

const applyForPlan = async (req, res) => {
  try {
    const { plan, email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has already applied for this plan
    if (user.appliedPlans.includes(plan._id)) {
      return res.status(400).json({ message: 'User already applied for this plan' });
    }

    // Add plan to user's applied plans
    user.appliedPlans.push(plan._id);
    await user.save();

    res.status(200).json({ message: 'Plan applied successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  applyForPlan,
};
