const mongoose = require('mongoose');
// const validator = require('validator');

const photoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
});

module.exports = mongoose.model('Photo', photoSchema);