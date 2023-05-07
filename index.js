const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/rate-limit');
const { centarlErrors } = require('./middlewares/central-errors');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routers = require('./routes/index.js');

const bcrypt = require('bcryptjs');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb+srv://nastya:lenovo12@kras-fire.gq735ul.mongodb.net/test', {//'mongodb://localhost:27017' //'mongodb+srv://IvanPlisyakov:actiVision12@cluster-mesto.ndo6c.mongodb.net/movies?retryWrites=true&w=majority'
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then(() => console.log('mongo connected'))
  .catch((err) => {console.log(err)});

app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(bodyParser.json());
app.use('/api', routers);
app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());
app.use(centarlErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  /*bcrypt.hash("Dflgtnrlshdbrvtvsksh!sssaaDjJfG846652926420", 10)
    .then((hash) => { 
      console.log(hash)
    });*/
});
