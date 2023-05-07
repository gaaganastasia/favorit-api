const mongoose = require('mongoose');
// const validator = require('validator');

const refundSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Refund', refundSchema);