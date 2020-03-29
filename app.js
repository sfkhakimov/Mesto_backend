const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const middleware = require('./middleware/middleware');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5e74e35fb5f45643dc6f608e',
  };

  next();
});
app.use('/users', users);
app.use('/cards', cards);
app.use(middleware);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
