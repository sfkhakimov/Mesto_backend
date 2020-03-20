const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Данные не записаны, произошла ошибка - ${err}` }));
};

const getUser = (req, res) => {
  User.find()
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Данные не записаны, произошла ошибка - ${err}` }));
};

const getUserId = (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Данные не записаны, произошла ошибка - ${err}` }));
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
    .catch((err) => res.status(500).send({ message: `Данные не обновлены, произошла ошибка - ${err}` }));
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
    .catch((err) => res.status(500).send({ message: `Данные не обновлены, произошла ошибка - ${err}` }));
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
};
