const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // You'll need to create this Mongoose model

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

// MongoDB connection (replace with your URI)
mongoose.connect("mongodb://127.0.0.1:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sign Up Route
app.post("/signup", async (req, res) => {
  try {
    const { parentName, infantName, infantAge, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      parentName,
      infantName,
      infantAge,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ userId: savedUser._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
