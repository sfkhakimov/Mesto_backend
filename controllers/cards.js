const Card = require('../models/card');
const NotFoundError = require('../errors/notFoundError');
const Forbidden = require('../errors/forbidden');

const getCard = (req, res, next) => {
  Card.find()
    .orFail(() => new NotFoundError('Не удалось получить карточки'))
    .then((card) => res.send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(new NotFoundError('Не удалось найти карточку'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        throw new Forbidden('Вы не можете удалять чужие карточки');
      }
      return Card.findByIdAndDelete(req.params.cardId)
        .then((cards) => res.send(cards));
    })
    .catch(next);
};

const likesCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Не удалось поставить лайк'))
    .then((card) => res.send(card))
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Не удалось убрать лайк'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likesCard,
  deleteLike,
};
