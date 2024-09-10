const mongoose = require('mongoose');

const LeaveTypeSchema = new mongoose.Schema({
  leaveType: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LeaveType', LeaveTypeSchema);
