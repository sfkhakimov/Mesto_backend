const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Пользователь не создан - ${err.message}` }));
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

module.exports = {
  createUser,
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
};
