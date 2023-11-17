const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // You'll need to create this Mongoose model
const Vaccine = require('./models/Vaccine'); // Adjust the path as per your project structure

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
app.post('/signup', async (req, res) => {
  try {
    // Extract user data from the request body
    const { parentName, infantName, infantAge, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Example standard vaccines data
    const standardVaccines = [
      { name: 'Hepatitis B', ageInMonths: 0 },
      { name: 'Rotavirus', ageInMonths: 2 },
      // Add other vaccines as per the schedule
    ];

    // Create vaccine documents
    const vaccineDocs = await Vaccine.insertMany(standardVaccines);
    const vaccineIds = vaccineDocs.map(vaccine => vaccine._id);

    // Create a new user with vaccine IDs
    const newUser = new User({
      parentName,
      infantName,
      infantAge,
      email,
      password: hashedPassword,
      vaccines: vaccineIds
    });

    // Save the new user
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
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


// Middleware to authenticate and set user info in the request
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_STRING

  if (token == null) {
    return res.sendStatus(401); // If no token, unauthorized
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.sendStatus(403); // If token is not valid, forbidden
    }
    req.user = user; // Set the user info in request
    next();
  });
};

// Profile Route
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    // Assuming the token includes the userId and not the email
    const user = await User.findById(req.user.userId).select('-password'); // Exclude the password from the result
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user); // Send user information excluding the password
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




//Vaccine Recommender 
const vaccineSchedule = {
  // Example schedule: age in months to vaccines
  2: ['Rotavirus', 'DTaP', 'Hib', 'Polio', 'PCV', 'Hepatitis B'],
  4: ['Rotavirus', 'DTaP', 'Hib', 'Polio', 'PCV'],
  6: ['Rotavirus', 'DTaP', 'Hib', 'Polio', 'PCV', 'Hepatitis B','Pnb','sbi'],
  // Add other ages and vaccines as appropriate
};

app.get('/vaccine-recommender/:userId', async (req, res) => {
  const userId = req.params.userId;


  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const ageInMonths = user.infantAge; // Assuming the age is stored correctly
    const recommendedVaccines = vaccineSchedule[ageInMonths] || [];
    res.json({ recommendedVaccines });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching vaccine recommendations');
  }
});

//Logout route 
const handleLogout = async () => {
  // Call the logout endpoint
  await fetch('http://localhost:5000/logout', { method: 'POST' });
  
  // Clear the token from storage
  localStorage.removeItem('token');

  // Redirect to the home page
  window.location.href = '/';
};


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
