const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: `Данные не записаны, произошла ошибка - ${err}` }));
};


module.exports = {
  createUser,
};
