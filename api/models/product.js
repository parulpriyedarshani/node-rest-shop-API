const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },  // required adds validation here making it mandatory
    productImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);

// A schema is the layout design of the object you wanna use whereas the model
// is the object itself or gives you the constructor to build such objects based on the schema that you gave.