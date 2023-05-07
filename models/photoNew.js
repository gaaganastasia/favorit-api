const mongoose = require('mongoose');
// const validator = require('validator');

const photoNewSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  newId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'new',
    required: true,
  },
});

module.exports = mongoose.model('PhotoNew', photoNewSchema);