const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  userId: { 
    type: String,  
    required: true  
  },
  itemId: {
    type: Number,  // or ObjectId, depending on your item schema
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  itemQuantity: {
    type: Number,
    required: true
  }
});

const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem;