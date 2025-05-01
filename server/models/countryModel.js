const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  continent: { type: String, required: true },
  categories: {
    type: [String],
    required: true,
    validate: [arrayLimit, 'At least one category is required']
  },
  averageCost: { type: Number, required: true }
});

function arrayLimit(val) {
  return val.length > 0;
}

module.exports = mongoose.model('Country', countrySchema);
