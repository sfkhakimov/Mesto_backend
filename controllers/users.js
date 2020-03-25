const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const InternalServerError = require('../errors/internalServerError');

const notFoundError = new NotFoundError('Запрашиваемый ресурс не найден');
const internalServerError = new InternalServerError('Запрос не выполнен, произошла ошибка');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(internalServerError.statusCode).send({ message: `${internalServerError.message}` }));
};

const getUser = (req, res) => {
  User.find()
    .then((user) => res.send(user))
    .catch((err) => res.status(internalServerError.statusCode).send({ message: `${internalServerError.message}` }));
};

const getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => res.status(notFoundError.statusCode).send({ message: `${notFoundError.message}` }));
};

const updateUser = (req, res) => {
  const { name, about, _id = req.user._id } = req.body;
  User.findByIdAndUpdate(_id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(internalServerError.statusCode).send({ message: `${internalServerError.message}` }));
};

const updateAvatar = (req, res) => {
  const { avatar, _id = req.user._id } = req.body;
  User.findByIdAndUpdate(_id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(internalServerError.statusCode).send({ message: `${internalServerError.message}` }));;
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
};
