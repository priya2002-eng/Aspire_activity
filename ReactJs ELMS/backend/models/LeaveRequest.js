const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  employee_id_number: { type: String, required: true },
  full_name: { type: String, required: true },
  leave_type: { type: String, required: true },
  reason: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Declined'], default: 'Pending' },
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
