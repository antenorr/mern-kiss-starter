//  To define how a product should look like in our application

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
});

module.exports = mongoose.model('Product', productSchema);
//  The first argument is the name of model that you want to use internally .
//  the second argument is the schema you want to use for that model