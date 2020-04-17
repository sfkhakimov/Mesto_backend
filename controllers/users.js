const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const Conflict = require('../errors/conflict');

const createUser = (req, res, next) => {
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
        .then((user) => res.status(201).send({
          name: user.name,
          about: user.about,
          email: user.email,
          avatar: user.avatar,
        }));
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.find()
    .orFail(() => new NotFoundError('Пользователи не найдены'))
    .then((user) => res.send(user))
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
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
    .catch(next);
};

const updateAvatar = (req, res, next) => {
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
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
  login,
};
