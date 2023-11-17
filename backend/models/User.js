const mongoose = require('mongoose');
const Vaccine = require('./Vaccine'); // Import the Vaccine schema

const userSchema = new mongoose.Schema({
  parentName: String,
  infantName: String,
  infantAge: Number,
  email: { type: String, unique: true },
  password: String,
  vaccines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vaccine' }] // Reference to the Vaccine documents
});

module.exports = mongoose.model('User', userSchema);
