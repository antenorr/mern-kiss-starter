const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');//  here we bring in the product file


//  **************************************************** */
mongoose.connect(`mongodb://rantenor:${process.env.MONGO_ATLAS_PW}@cluster0-shard-00-00-sl0t1.mongodb.net:27017,cluster0-shard-00-01-sl0t1.mongodb.net:27017,cluster0-shard-00-02-sl0t1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, {
  useNewUrlParser: true,
  // useMongoClient: true --per warning has been deprecated
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));// true for embeds
app.use(bodyParser.json());

//  ***CORS handling business - adding errors to the response */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});


//  **************************************************** */
//  Routes that will handle the requests
app.use('/products', productRoutes);


//  Below we have error handling from #4 19-30
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);//  forward the request with the error mess. with it
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message },
  });
});


module.exports = app;
//  this express app will function as a request handler!