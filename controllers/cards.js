const Card = require('../models/card');

const getCard = (req, res) => {
  Card.find()
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Не удалось получить карточки, произошла ошибка - ${err}` }));
};

const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Карточка не создана, произошла ошибка - ${err}` }));
};

const deleteCard = (req, res) => {
  const { _id } = req.body;
  Card.findByIdAndRemove({ _id })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Карточка не удалена, произошла ошибка - ${err}` }));
};

const likesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Не удалось поставить лайк, произошла ошибка - ${err}` }));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: `Не удалось убрать лайк, произошла ошибка - ${err}` }));
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likesCard,
  deleteLike,
};
