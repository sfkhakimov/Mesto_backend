const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  const unauthorized = new Unauthorized('Необходима авторизация');
  if (!authorization) {
    return res.status(unauthorized.statusCode).send({ message: unauthorized.message });
  }
  let payload;

  try {
    payload = jwt.verify(authorization, '9fff22460051528711f3ab535499a758');
  } catch (err) {
    return res.status(unauthorized.statusCode).send({ message: unauthorized.message });
  }
  req.user = payload;

  return next();
};
