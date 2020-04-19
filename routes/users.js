const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUser,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const method = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Поле avatar заполнено некорректно');
};

router.get('/', getUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required().length(24),
  }),
}), getUserId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(method, 'custom validation'),
  }),
}), updateAvatar);

module.exports = router;
