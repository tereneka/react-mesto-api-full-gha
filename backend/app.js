require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimit = require('express-rate-limit');
const { router } = require('./routes/router');
const error = require('./middlewares/error');
const customErr = require('./middlewares/customError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const {
  PORT = 3000,
  NODE_ENV,
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL);

app.use(cookieParser()); // подключаем парсер кук как мидлвэр

// Если фронтенд и бэкенд работают на разных доменах, то в fetch нужно включить опцию credentials:
// fetch('/', {
//   method: 'GET',
//   credentials: 'include', // теперь куки посылаются вместе с запросом
// });

app.use(requestLogger); // подключаем логгер запросов

app.use(cors);

app.use(limiter);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(customErr);

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening in ${NODE_ENV || 'develop'} mode on port ${PORT}`);
});
