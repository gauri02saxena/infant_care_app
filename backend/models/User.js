const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  parentName: String,
  infantName: String,
  infantAge: Number,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model('User', userSchema);
