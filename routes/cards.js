const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getCard,
  createCard,
  deleteCard,
  likesCard,
  deleteLike,
} = require('../controllers/cards');

const method = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Поле avatar заполнено некорректно');
};

router.get('/', getCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom(method, 'custom validation'),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().length(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().length(24),
  }),
}), likesCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required().length(24),
  }),
}), deleteLike);

module.exports = router;
