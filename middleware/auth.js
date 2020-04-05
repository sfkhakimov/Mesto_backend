const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  const unauthorized = new Unauthorized('Необходима авторизация');
  if (!authorization) {
    return res.status(unauthorized.statusCode).send({ message: unauthorized.message });
  }
  let payload;

  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    return res.status(unauthorized.statusCode).send({ message: unauthorized.message });
  }
  req.user = payload;

  return next();
};
