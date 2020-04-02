const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    validate: async function emailValidator(email) {
      return validator.isEmail(email);
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    required: true,
    type: String,
    unique: true,
    validate: async function typeValidate(url) {
      return validator.isURL(url);
    },
  },
});

module.exports = mongoose.model('user', userSchema);
