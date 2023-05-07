const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  info: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Delivery', deliverySchema);