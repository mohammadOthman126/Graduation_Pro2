const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destinations: [
    {
      destinationId: { type: String, required: true },
      name: String,
      averageCost: Number,
      categories: [String],
      continent: String,
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
