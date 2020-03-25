const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const InternalServerError = require('../errors/internalServerError');

const notFoundError = new NotFoundError('Запрашиваемый ресурс не найден');
const internalServerError = new InternalServerError('Запрос не выполнен, произошла ошибка');

const getCard = (req, res) => {
  Card.find()
    .then((card) => res.send(card))
    .catch((err) => res.status(notFoundError.statusCode).send({ message: `${notFoundError.message}` }));
};

const createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => res.status(internalServerError.statusCode).send({ message: `${internalServerError.message}` }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(notFoundError.statusCode).send({ message: `${notFoundError.message}` }));
};

const likesCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(notFoundError.statusCode).send({ message: `${notFoundError.message}` }));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => res.status(notFoundError.statusCode).send({ message: `${notFoundError.message}` }));
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likesCard,
  deleteLike,
};
