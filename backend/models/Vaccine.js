const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  name: String,
  ageInMonths: Number,
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Vaccine', vaccineSchema);
