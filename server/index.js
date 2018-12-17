const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const initRouter = require('./routes/init');
const authRouter = require('./routes/auth');
const productsRoute = require('./routes/products');
const buyRoute = require('./routes/buy');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: '*'}));

app.use('/init', initRouter);
app.use('/auth', authRouter);
app.use('/products', productsRoute);
app.use('/buy', buyRoute);

app.listen(8080, () => {
  console.log('on port 8080');
  mongoose.connect(
    'mongodb://admin:tester123@ds227654.mlab.com:27654/vasilevsky',
    {useNewUrlParser: true}
  );
});
