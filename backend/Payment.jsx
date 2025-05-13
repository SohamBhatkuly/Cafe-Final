const mongoose = require('mongoose');

// Define the payment schema
const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Store user ID
  amount: { type: Number, required: true }, // Store payment amount
  address: { type: String, required: true } // Store user address
//   paymentMode: { type: String, required: true }, // Store payment mode (e.g., Credit Card, UPI, etc.)
}, { timestamps: true }); // Optional: Adds createdAt and updatedAt fields

module.exports = mongoose.model('Payment', paymentSchema);
