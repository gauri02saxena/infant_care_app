const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); 
const Vaccine = require("./models/Vaccine"); 

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

// MongoDB connection 
mongoose.connect("mongodb://127.0.0.1:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sign Up Route
app.post("/signup", async (req, res) => {
  try {
    const { parentName, infantName, infantAge, email, password } = req.body;

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Vaccines data
    const standardVaccines = [
      { name: "Oral Polio Vaccine (OPV) - 1", ageInMonths: 1.5 },
      { name: "Pentavalent - 1", ageInMonths: 1.5 },
      { name: "Rotavirus Vaccine (RVV) - 1", ageInMonths: 1.5 },
      { name: "Pneumococcal Conjugate Vaccine (PCV) - 1*", ageInMonths: 1.5 },
      { name: "Inactivated Polio Vaccine (fIPV) - 1", ageInMonths: 1.5 },
      { name: "Rotavirus", ageInMonths: 2 },
      { name: "DTaP", ageInMonths: 2 },
      { name: "Hib", ageInMonths: 2 },
      { name: "Polio", ageInMonths: 2 },
      { name: "PCV", ageInMonths: 2 },
      { name: "Hepatitis B", ageInMonths: 2 },
      { name: "Pentavalent - 2", ageInMonths: 2.5 },
      { name: "Oral Polio Vaccine (OPV) - 2", ageInMonths: 2.5 },
      { name: "Rotavirus Vaccine (RVV) - 2", ageInMonths: 2.5 },
      { name: "Pentavalent - 3", ageInMonths: 3.5 },
      { name: "Oral Polio Vaccine (OPV) - 3", ageInMonths: 3.5 },
      { name: "Rotavirus Vaccine (RVV) - 3", ageInMonths: 3.5 },
      { name: "Pneumococcal Conjugate Vaccine (PCV) - 2", ageInMonths: 3.5 },
      { name: "Inactivated Polio Vaccine (fIPV) - 2", ageInMonths: 3.5 },
      { name: "Rotavirus", ageInMonths: 4 },
      { name: "DTaP", ageInMonths: 4 },
      { name: "Hib", ageInMonths: 4 },
      { name: "Polio", ageInMonths: 4 },
      { name: "PCV", ageInMonths: 4 },
      { name: "Rotavirus", ageInMonths: 6 },
      { name: "DTaP", ageInMonths: 6 },
      { name: "Hib", ageInMonths: 6 },
      { name: "Polio", ageInMonths: 6 },
      { name: "PCV", ageInMonths: 6 },
      { name: "Hepatitis B", ageInMonths: 6 },
      { name: "Pnb", ageInMonths: 6 },
      { name: "sbi", ageInMonths: 6 },
      { name: "Measles & Rubella (MR) - 1", ageInMonths: 9 },
      { name: "Japanese Encephalitis (JE-1)", ageInMonths: 9 },
      { name: "Pneumococcal Conjugate Vaccine - Booster*", ageInMonths: 9 },
      { name: "Measles & Rubella (MR) - 1", ageInMonths: 10 },
      { name: "Japanese Encephalitis (JE-1)", ageInMonths: 10 },
      { name: "Pneumococcal Conjugate Vaccine - Booster*", ageInMonths: 10 },
      { name: "Measles & Rubella (MR) - 1", ageInMonths: 11 },
      { name: "Japanese Encephalitis (JE-1)", ageInMonths: 11 },
      { name: "Pneumococcal Conjugate Vaccine - Booster*", ageInMonths: 11 },
      { name: "Measles & Rubella (MR) - 1", ageInMonths: 12 },
      { name: "Japanese Encephalitis (JE-1)", ageInMonths: 12 },
      { name: "Pneumococcal Conjugate Vaccine - Booster*", ageInMonths: 12 },
    ];

    // Creating vaccine documents
    const vaccineDocs = await Vaccine.insertMany(standardVaccines);
    const vaccineIds = vaccineDocs.map((vaccine) => vaccine._id);

    // Creating a new user with vaccine IDs
    const newUser = new User({
      parentName,
      infantName,
      infantAge,
      email,
      password: hashedPassword,
      vaccines: vaccineIds,
    });

    // Saving the new user
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser._id });
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
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (token == null) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }
    req.user = user; 
    next();
  });
};

// Profile Route
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Vaccine Recommender
const vaccineSchedule = {
  1.5: [
    "Oral Polio Vaccine (OPV) - 1",
    "Pentavalent - 1",
    "Rotavirus Vaccine (RVV) - 1",
    "Pneumococcal Conjugate Vaccine (PCV) - 1*",
    "Inactivated Polio Vaccine (fIPV) - 1",
  ],
  2: ["Rotavirus", "DTaP", "Hib", "Polio", "PCV", "Hepatitis B"],
  2.5: [
    "Pentavalent - 2",
    "Oral Polio Vaccine (OPV) - 2",
    "Oral Polio Vaccine (OPV) - 2",
    "Rotavirus Vaccine (RVV) - 2",
  ],
  3.5: [
    "Pentavalent - 3",
    "Oral Polio Vaccine (OPV) - 3",
    "Rotavirus Vaccine (RVV) - 3",
    "Pneumococcal Conjugate Vaccine (PCV) - 2",
    "Inactivated Polio Vaccine (fIPV) - 2",
  ],

  4: ["Rotavirus", "DTaP", "Hib", "Polio", "PCV"],
  6: ["Rotavirus", "DTaP", "Hib", "Polio", "PCV", "Hepatitis B"],
  9: [
    "Measles & Rubella (MR) - 1",
    "Japanese Encephalitis (JE-1)",
    "Pneumococcal Conjugate Vaccine - Booster*",
  ],
  10: [
    "Measles & Rubella (MR) - 1",
    "Japanese Encephalitis (JE-1)",
    "Pneumococcal Conjugate Vaccine - Booster*",
  ],
  11: [
    "Measles & Rubella (MR) - 1",
    "Japanese Encephalitis (JE-1)",
    "Pneumococcal Conjugate Vaccine - Booster*",
  ],
  12: [
    "Measles & Rubella (MR) - 1",
    "Japanese Encephalitis (JE-1)",
    "Pneumococcal Conjugate Vaccine - Booster*",
  ],

};

// Vaccine Recommender Route
app.get("/vaccine-recommender/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const ageInMonths = user.infantAge; 
    let recommendedVaccines = vaccineSchedule[ageInMonths];

    if (!recommendedVaccines) {
      const ages = Object.keys(vaccineSchedule)
        .map((age) => parseFloat(age))
        .sort((a, b) => a - b);
      const nextAge = ages.find((age) => age > ageInMonths);
      recommendedVaccines = nextAge ? vaccineSchedule[nextAge] : [];
    }

    res.json({ recommendedVaccines });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while fetching vaccine recommendations");
  }
});

// Vaccine Tracker Route
app.get('/vaccine-tracker/:userId', authenticateToken, async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const currentAge = user.infantAge;
    let dueVaccines = [];

    for (const [age, vaccines] of Object.entries(vaccineSchedule)) {
      if (currentAge >= parseFloat(age)) {
        dueVaccines = [...dueVaccines, ...vaccines];
      }
    }

    // Filtering administered vaccines
    if (user.administeredVaccines) {
      dueVaccines = dueVaccines.filter(vaccine => 
        !user.administeredVaccines.some(administered => administered.name === vaccine)
      );
    }

    dueVaccines = [...new Set(dueVaccines)].sort();

    res.json({ dueVaccines });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while fetching vaccine tracker data");
  }
});


// POST route to mark a vaccine as administered
app.post('/vaccine-administered/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;
  const { vaccineName } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!user.administeredVaccines.some(vaccine => vaccine.name === vaccineName)) {
      user.administeredVaccines.push({ name: vaccineName, dateAdministered: new Date() });
      await user.save();
    }

    res.status(200).send("Vaccine marked as administered");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating vaccine information");
  }
});


//Logout route
const handleLogout = async () => {
  await fetch("http://localhost:5000/logout", { method: "POST" });

  localStorage.removeItem("token");

  window.location.href = "/";
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/login", {
      email: loginEmail,
      password: loginPassword,
    });

    if (response.status === 200) {
      console.log("Login successful");
      localStorage.setItem("token", response.data.token);
      history.push("/dashboard", {
        dashboardData: response.data.dashboardData,
      });
    } else {
      console.log("Login failed");
    }
  } catch (error) {
    console.error(
      "Login failed:",
      error.response ? error.response.data : "Server error"
    );
  }
};
