const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  department: String,
  phoneNumber: String,
  birthDate: Date,
  gender: String,
  streetAddress: String,
  city: String,
  country: String,
  region: String,
  postalCode: String,
  password: { type: String, required: true },
});

employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

employeeSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('Employee', employeeSchema);
