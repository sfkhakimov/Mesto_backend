const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const Conflict = require('../errors/conflict');

const createUser = (req, res) => {
  const {
    name,
    about,
    email,
    password,
    avatar,
  } = req.body;

  User.find({ email })
    .then((mail) => {
      if (mail.length !== 0) {
        throw new Conflict('Пользователь с таки email уже существует');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          about,
          email,
          password: hash,
          avatar,
        }))
        .then((user) => res.send({
          name: user.name,
          about: user.about,
          email: user.email,
          avatar: user.avatar,
        }));
    })
    .catch((err) => res.status(err.statusCode || 500).send({ message: err.message }));
};

const getUser = (req, res) => {
  User.find()
    .orFail(() => new NotFoundError('Пользователи не найдены'))
    .then((user) => res.send(user))
    .catch((err) => res.status(err.statusCode || 500).send({ message: err.message }));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => res.status(err.statusCode || 500).send({ message: err.message }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .orFail(() => new NotFoundError('Данные пользователя не обновлены'))
    .then((user) => res.send(user))
    .catch((err) => res.status(err.statusCode || 500).send({ message: err.message }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .orFail(() => new NotFoundError('Аватар не обновлен'))
    .then((user) => res.send(user))
    .catch((err) => res.status(err.statusCode || 500).send({ message: err.message }));
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch((err) => res.status(err.statusCode || 500).send({ message: err.message }));
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
  login,
};
