const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Данные не записаны, произошла ошибка - ${err}` }));
};

const getUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.find({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Данные не записаны, произошла ошибка - ${err}` }));
};

const gerUserId = (req, res) => {
  User.findById(req.params._id)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Данные не записаны, произошла ошибка - ${err}` }));
};


module.exports = {
  createUser,
  getUser,
  gerUserId,
};
