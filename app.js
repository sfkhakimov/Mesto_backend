const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const middleware = require('./middleware/middleware');
const auth = require('./middleware/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/loggers');

const { PORT } = require('./config');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);
app.use('/users', users);
app.use('/cards', cards);

app.use(errorLogger);
app.use(middleware);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
