const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const middleware = require('./middleware/middleware');
const auth = require('./middleware/auth');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/signUp', createUser);
app.post('/signIn', login);

app.use(auth);
app.use('/users', users);
app.use('/cards', cards);
app.use(middleware);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
