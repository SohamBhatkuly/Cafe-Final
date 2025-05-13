// ReviewModel.js
const mongoose = require('mongoose');

// Create a review schema
const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserInfo', required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true },  // Assume ratings are out of 5
  createdAt: { type: Date, default: Date.now },
});

mongoose.model('Review', ReviewSchema);
