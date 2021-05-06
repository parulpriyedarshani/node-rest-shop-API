const mongoose = require('mongoose');

const orderRoutes = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // for creating a relation to the product schema
        required: true
    },
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Order', orderRoutes);