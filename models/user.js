const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const Unauthorized = require('../errors/unauthorized');

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
    unique: true,
    validate: async function emailValidator(email) {
      return validator.isEmail(email);
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    required: true,
    type: String,
    validate: async function typeValidate(url) {
      return validator.isURL(url);
    },
  },
});

userSchema.statics.findUserByCredentials = function findByEmailAndPasword(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new Unauthorized('Неправильная почта или пароль'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильная почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
